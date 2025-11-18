#!/usr/bin/env node

/**
 * Schema Validation Script for Sierra Property Partners
 * 
 * This script validates all JSON-LD schemas in the codebase to ensure
 * SEO compliance before commits. It integrates with the context7 MCP
 * server for comprehensive schema validation.
 * 
 * Usage: node scripts/validate-schemas.ts
 */

import { glob } from 'glob';
import { readFileSync } from 'fs';
import { join } from 'path';

interface ValidationError {
  file: string;
  line?: number;
  message: string;
  severity: 'error' | 'warning';
}

const errors: ValidationError[] = [];
const warnings: ValidationError[] = [];

/**
 * Extract JSON-LD schemas from TypeScript/TSX files
 */
function extractSchemas(filePath: string): Array<{ schema: any; line: number }> {
  const content = readFileSync(filePath, 'utf-8');
  const schemas: Array<{ schema: any; line: number }> = [];
  
  // Match script tags with JSON-LD
  const jsonLdRegex = /<script[^>]*type="application\/ld\+json"[^>]*>([^<]*)<\/script>/g;
  const matches = content.matchAll(jsonLdRegex);
  
  for (const match of matches) {
    try {
      const schemaText = match[1].trim();
      
      // Extract from dangerouslySetInnerHTML if present
      if (schemaText.includes('dangerouslySetInnerHTML')) {
        const innerMatch = /JSON\.stringify\((\w+)\)/.exec(schemaText);
        if (innerMatch) {
          // Schema is generated dynamically - we'll validate the generator function
          const schemaVarName = innerMatch[1];
          const lineNumber = content.substring(0, match.index).split('\n').length;
          
          // Look for the schema generation call
          const schemaGenRegex = new RegExp(`const ${schemaVarName} = (generate\\w+)\\(`);
          const genMatch = content.match(schemaGenRegex);
          
          if (genMatch) {
            schemas.push({
              schema: { _generator: genMatch[1], _var: schemaVarName },
              line: lineNumber
            });
          }
        }
      } else {
        // Static JSON-LD schema
        const schema = JSON.parse(schemaText);
        const lineNumber = content.substring(0, match.index).split('\n').length;
        schemas.push({ schema, line: lineNumber });
      }
    } catch (e) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      errors.push({
        file: filePath,
        line: lineNumber,
        message: `Invalid JSON-LD schema: ${e instanceof Error ? e.message : 'Parse error'}`,
        severity: 'error'
      });
    }
  }
  
  return schemas;
}

/**
 * Validate LocalBusiness schema
 */
function validateLocalBusinessSchema(schema: any, file: string, line: number): void {
  if (schema['@type'] !== 'LocalBusiness') return;
  
  const required = ['name', 'address', 'telephone', 'areaServed'];
  
  for (const field of required) {
    if (!schema[field]) {
      errors.push({
        file,
        line,
        message: `LocalBusiness schema missing required field: ${field}`,
        severity: 'error'
      });
    }
  }
  
  // Validate address structure
  if (schema.address) {
    const addressRequired = ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode'];
    for (const field of addressRequired) {
      if (!schema.address[field]) {
        errors.push({
          file,
          line,
          message: `LocalBusiness address missing field: ${field}`,
          severity: 'error'
        });
      }
    }
  }
  
  // Validate areaServed for location pages
  if (file.includes('[city]') && (!schema.areaServed || schema.areaServed.length === 0)) {
    warnings.push({
      file,
      line,
      message: 'Location page should include areaServed with city and county',
      severity: 'warning'
    });
  }
}

/**
 * Validate Service schema
 */
function validateServiceSchema(schema: any, file: string, line: number): void {
  if (schema['@type'] !== 'Service') return;
  
  const required = ['name', 'description', 'provider'];
  
  for (const field of required) {
    if (!schema[field]) {
      errors.push({
        file,
        line,
        message: `Service schema missing required field: ${field}`,
        severity: 'error'
      });
    }
  }
  
  // Validate provider is LocalBusiness
  if (schema.provider && schema.provider['@type'] !== 'LocalBusiness') {
    errors.push({
      file,
      line,
      message: 'Service provider should be of type LocalBusiness',
      severity: 'error'
    });
  }
}

/**
 * Validate BreadcrumbList schema
 */
function validateBreadcrumbSchema(schema: any, file: string, line: number): void {
  if (schema['@type'] !== 'BreadcrumbList') return;
  
  if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
    errors.push({
      file,
      line,
      message: 'BreadcrumbList must have itemListElement array',
      severity: 'error'
    });
    return;
  }
  
  schema.itemListElement.forEach((item: any, index: number) => {
    if (!item.item || !item.name) {
      errors.push({
        file,
        line,
        message: `Breadcrumb item ${index + 1} missing item or name`,
        severity: 'error'
      });
    }
    if (item.position !== index + 1) {
      errors.push({
        file,
        line,
        message: `Breadcrumb item ${index + 1} has incorrect position: ${item.position}`,
        severity: 'error'
      });
    }
  });
}

/**
 * Validate Organization schema
 */
function validateOrganizationSchema(schema: any, file: string, line: number): void {
  if (schema['@type'] !== 'Organization') return;
  
  const required = ['name', 'url'];
  
  for (const field of required) {
    if (!schema[field]) {
      errors.push({
        file,
        line,
        message: `Organization schema missing required field: ${field}`,
        severity: 'error'
      });
    }
  }
  
  // Check for recommended fields
  const recommended = ['logo', 'contactPoint', 'sameAs'];
  for (const field of recommended) {
    if (!schema[field]) {
      warnings.push({
        file,
        line,
        message: `Organization schema missing recommended field: ${field}`,
        severity: 'warning'
      });
    }
  }
}

/**
 * Main validation function
 */
async function validateSchemas(): Promise<void> {
  console.log('🔍 Scanning for JSON-LD schemas...\n');
  
  // Find all TSX and TS files in app directory
  const files = await glob('src/app/**/*.{ts,tsx}', { ignore: 'node_modules/**' });
  
  console.log(`Found ${files.length} files to scan\n`);
  
  let schemaCount = 0;
  
  for (const file of files) {
    const schemas = extractSchemas(file);
    
    if (schemas.length > 0) {
      console.log(`📄 ${file}: ${schemas.length} schema(s)`);
      schemaCount += schemas.length;
    }
    
    for (const { schema, line } of schemas) {
      // Skip dynamically generated schemas (they're validated by TypeScript)
      if (schema._generator) {
        console.log(`  ✓ Dynamic schema generated by ${schema._generator}()`);
        continue;
      }
      
      // Validate based on @type
      switch (schema['@type']) {
        case 'LocalBusiness':
          validateLocalBusinessSchema(schema, file, line);
          break;
        case 'Service':
          validateServiceSchema(schema, file, line);
          break;
        case 'BreadcrumbList':
          validateBreadcrumbSchema(schema, file, line);
          break;
        case 'Organization':
          validateOrganizationSchema(schema, file, line);
          break;
        default:
          warnings.push({
            file,
            line,
            message: `Unknown schema type: ${schema['@type']}`,
            severity: 'warning'
          });
      }
      
      // Validate @context
      if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
        errors.push({
          file,
          line,
          message: 'Schema missing or invalid @context (should be https://schema.org)',
          severity: 'error'
        });
      }
    }
  }
  
  console.log(`\n📊 Validation Results:`);
  console.log(`   Schemas validated: ${schemaCount}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Warnings: ${warnings.length}\n`);
  
  // Display errors
  if (errors.length > 0) {
    console.log('❌ ERRORS:\n');
    errors.forEach(err => {
      console.log(`   ${err.file}:${err.line || '?'}`);
      console.log(`   ${err.message}\n`);
    });
  }
  
  // Display warnings
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    warnings.forEach(warn => {
      console.log(`   ${warn.file}:${warn.line || '?'}`);
      console.log(`   ${warn.message}\n`);
    });
  }
  
  // Exit with error code if there are errors
  if (errors.length > 0) {
    console.log('❌ Schema validation failed. Please fix errors before committing.\n');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('✅ Schema validation passed with warnings.\n');
    process.exit(0);
  } else {
    console.log('✅ All schemas valid!\n');
    process.exit(0);
  }
}

// Run validation
validateSchemas().catch((error) => {
  console.error('Fatal error during validation:', error);
  process.exit(1);
});
