interface FAQ {
  question: string;
  answer: string;
}

export const serviceFAQs: Record<string, FAQ[]> = {
  "residential-property-management": [
    {
      question: "What does residential property management cost in Northern California?",
      answer: "Our residential property management fees typically range from 8-12% of monthly rent collected, depending on property type, location, and services included. For properties in Placer, Nevada, Sacramento, and El Dorado counties, we provide competitive rates that include all core services with no hidden fees."
    },
    {
      question: "How quickly can you place tenants in my rental property?",
      answer: "Our average time-to-lease is just 12 days, significantly faster than the 28-day market average. This is achieved through professional photography, multi-platform marketing, and strategic pricing based on current market analysis of your specific neighborhood."
    },
    {
      question: "Do you manage single-family homes, condos, and apartments?",
      answer: "Yes, we manage all types of residential properties throughout Northern California including single-family homes, condominiums, townhouses, and small apartment buildings. Each property type requires different management strategies, and our team has extensive experience with all residential formats."
    },
    {
      question: "What areas of Northern California do you serve?",
      answer: "We serve property owners throughout Placer County, Nevada County, Sacramento County, and El Dorado County, covering over 60 communities from the Sierra foothills to the Sacramento valley. This includes cities like Auburn, Roseville, Folsom, Truckee, Grass Valley, and many others."
    },
    {
      question: "How do you screen potential tenants?",
      answer: "Our comprehensive tenant screening includes credit reports, criminal background checks, eviction history searches, employment verification, landlord references, and income qualification (ensuring rent doesn't exceed 30% of gross monthly income). This thorough process reduces problem tenancies by 90%."
    }
  ],
  "commercial-property-management": [
    {
      question: "What types of commercial properties do you manage?",
      answer: "We manage retail spaces, office buildings, industrial warehouses, and mixed-use developments throughout Northern California. Each property type requires specialized expertise in lease structures, tenant relationships, and maintenance coordination."
    },
    {
      question: "How do you handle commercial lease agreements and CAM charges?",
      answer: "Our team specializes in complex commercial lease structures including triple-net (NNN) agreements, common area maintenance (CAM) charges, percentage rent clauses, and tenant improvement allowances. We ensure lease terms protect owner interests while remaining competitive."
    },
    {
      question: "What is CAM reconciliation and how often is it performed?",
      answer: "CAM (Common Area Maintenance) reconciliation occurs annually, comparing actual operating expenses against estimates collected from tenants throughout the year. We provide detailed reconciliation statements showing all expenses, any adjustments, and credit balances or additional charges."
    },
    {
      question: "How do you handle tenant retention for commercial properties?",
      answer: "We maintain 95%+ tenant retention rates through proactive communication, quarterly business reviews, immediate response to operational issues, and collaborative problem-solving. Our tenant retention programs significantly reduce turnover costs and maintain stable cash flow."
    },
    {
      question: "What maintenance services do you provide for commercial properties?",
      answer: "Our commercial maintenance includes HVAC systems, parking lot maintenance, roof repairs, ADA compliance updates, energy efficiency improvements, and preventive maintenance programs. We coordinate with licensed contractors and provide detailed work order tracking."
    }
  ],
  "tenant-placement-leasing": [
    {
      question: "How long does the tenant placement process typically take?",
      answer: "Our average tenant placement takes 12 days from listing to signed lease, compared to the 28-day market average. This includes professional photography, marketing launch, showing coordination, screening, and lease execution."
    },
    {
      question: "What marketing platforms do you use to find tenants?",
      answer: "We use a multi-platform approach including Zillow, Trulia, Apartments.com, Rent.com, Craigslist, Facebook Marketplace, and our own website. This reaches 95% of active tenant searches and generates significantly more qualified leads than single-platform marketing."
    },
    {
      question: "Do you provide virtual tours for out-of-area prospects?",
      answer: "Yes, we create professional virtual tours and video walkthroughs that are essential for out-of-area tenants and seasonal renters seeking properties. These immersive experiences pre-qualify prospects and reduce time spent on unqualified showings."
    },
    {
      question: "How comprehensive is your tenant screening process?",
      answer: "Our screening includes credit reports, criminal background checks, eviction history, employment verification, landlord references, and income verification. Every applicant undergoes rigorous evaluation to ensure only qualified tenants occupy your properties."
    },
    {
      question: "What rental rate should I charge for my property?",
      answer: "We conduct comprehensive market analysis evaluating comparable properties, current market conditions, seasonal trends, and your property's unique features. Our pricing strategy balances maximum revenue with minimal vacancy time for optimal returns."
    }
  ],
  "rent-collection-accounting": [
    {
      question: "How do tenants pay rent through your system?",
      answer: "We offer multiple payment methods including online portal payments via credit card, debit card, or ACH transfer, automated recurring payments, traditional check payments with lockbox processing, and emergency payment options for extenuating circumstances."
    },
    {
      question: "When do property owners receive their monthly statements?",
      answer: "Monthly owner statements are available within 5 business days of month-end through your owner portal. Statements include detailed rent receipts, operating expenses, maintenance costs, management fees, reserve balances, and year-to-date comparisons."
    },
    {
      question: "How quickly are owner distributions processed?",
      answer: "Owner distributions are processed via direct deposit within 3-5 business days of month-end after all bills are paid and reconciliations are complete. We maintain adequate reserve balances while maximizing distributions to owners."
    },
    {
      question: "Do you handle year-end tax preparation?",
      answer: "Yes, we provide comprehensive tax documents including 1099 forms for contractors, Schedule E-formatted summaries, property tax verification, depreciation schedules, and detailed transaction registers. Our documentation typically saves owners 5-10 hours of accountant time annually."
    },
    {
      question: "What payment methods do you accept for rent collection?",
      answer: "We accept online payments (preferred), ACH transfers, credit/debit cards, checks, and money orders. Our automated payment reminders and multi-channel approach has achieved 98% collection rates, significantly above the 87% industry average."
    }
  ],
  "maintenance-repairs": [
    {
      question: "How quickly do you respond to emergency maintenance requests?",
      answer: "We maintain a 24/7 emergency hotline with immediate response protocols. True emergencies receive attention within 2-4 hours, including plumbing leaks, heating failures, electrical issues, and security concerns that could cause property damage."
    },
    {
      question: "Do you have preferred contractors with negotiated rates?",
      answer: "Yes, we maintain a vetted network of licensed, insured contractors who provide quality work at competitive prices. Preferred vendors often offer 15-25% discounts below retail pricing in exchange for consistent work volume from our managed properties."
    },
    {
      question: "How do you handle preventive maintenance?",
      answer: "Our preventive maintenance programs include HVAC tune-ups, gutter cleaning, landscape care, water heater servicing, smoke detector testing, roof inspections, and exterior maintenance. This proactive approach extends equipment lifespan and prevents costly emergency breakdowns."
    },
    {
      question: "What maintenance costs should I expect annually?",
      answer: "Typical maintenance costs range from 5-15% of annual rent depending on property age and condition. Mountain properties may require additional winterization and snow-related services. We provide detailed budgets and track all expenses for transparency."
    },
    {
      question: "Do you get multiple bids for major repairs?",
      answer: "For routine repairs under specified thresholds, we utilize preferred vendors for efficiency. For major projects exceeding thresholds, we obtain competitive bids from multiple qualified contractors and provide detailed proposals with recommendations."
    }
  ],
  "property-inspections": [
    {
      question: "How often do you inspect rental properties?",
      answer: "We conduct move-in inspections, routine inspections (annually or semi-annually), drive-by inspections (monthly or quarterly), move-out inspections, and vacant property inspections. Inspections can also be scheduled for specific concerns or seasonal needs."
    },
    {
      question: "What does a property inspection include?",
      answer: "Comprehensive inspections include room-by-room evaluation with photography, system testing (HVAC, plumbing, electrical, appliances), exterior and landscape assessment, lease compliance verification, and detailed reporting with photos and recommendations."
    },
    {
      question: "Do you inspect properties during winter in mountain areas?",
      answer: "Yes, we provide specialized winter inspections for mountain properties verifying heating system operation, checking roof conditions, ensuring adequate insulation, testing backup power systems where applicable, and assessing fire safety equipment functionality."
    },
    {
      question: "How quickly do I receive inspection reports?",
      answer: "Inspection reports are delivered within 48 hours of completion and include high-resolution photographs, written descriptions, prioritized action items, cost estimates for recommended repairs, and lease compliance notes."
    },
    {
      question: "What documentation do you provide for move-in and move-out?",
      answer: "We provide comprehensive documentation with room-by-room photography, written descriptions of conditions, system functionality tests, meter readings, and tenant signatures acknowledging accuracy. This baseline documentation prevents disputes and supports security deposit decisions."
    }
  ],
  "eviction-services": [
    {
      question: "What are the typical costs and timeline for evictions in California?",
      answer: "Eviction costs range from $2,000-5,000 including attorney fees, court costs, and lost rent. Timeline varies from 30-90 days depending on case complexity. Our professional management typically recovers 30-40% more than owner-managed proceedings while reducing stress and time commitment."
    },
    {
      question: "How do you handle the legal aspects of evictions?",
      answer: "We work closely with experienced eviction attorneys specializing in California landlord-tenant law, ensure compliance with all legal requirements, maintain proper documentation, and represent owner interests throughout proceedings while keeping owners informed of progress."
    },
    {
      question: "Do you explore alternatives to formal evictions?",
      answer: "Yes, we investigate cash-for-keys negotiations offering financial incentives for voluntary departure, stipulated agreements allowing tenants to cure violations under court supervision, and other alternatives that often save time and money compared to contested evictions."
    },
    {
      question: "What notices are required for different types of evictions?",
      answer: "California requires specific notices: Three-Day Notice to Pay or Quit for non-payment, Three-Day Notice to Cure or Quit for correctable violations, Three-Day Notice to Quit for non-correctable violations, and appropriate 30/60/90-day notices for no-cause terminations depending on tenancy length."
    },
    {
      question: "How do you prevent evictions before they become necessary?",
      answer: "Our comprehensive screening identifies high-risk applicants, early intervention programs address payment issues before escalation, clear lease enforcement establishes expectations, and regular communication maintains positive relationships. Properties under our management experience 60% fewer evictions than market average."
    }
  ],
  "lease-renewals": [
    {
      question: "When should I start the lease renewal process?",
      answer: "We begin renewal discussions 90-120 days before lease expiration, providing adequate time for market analysis, tenant evaluation, negotiation, and if necessary, new tenant marketing. Early engagement shows professionalism and gives tenants time for informed decisions."
    },
    {
      question: "How do you determine appropriate rent increases?",
      answer: "Our market analysis includes comparable properties, rental trends, vacancy rates, neighborhood development, and economic indicators. We balance competitiveness with revenue optimization, often achieving 75% tenant retention rates while maintaining competitive rental rates."
    },
    {
      question: "What if tenants request lower rent or resist increases?",
      answer: "When tenants resist increases, we present market data showing competitiveness, offer lease term extensions in exchange for current rates, consider minor property improvements as goodwill gestures, and evaluate partial increases phased over renewal terms."
    },
    {
      question: "How do you evaluate tenant performance for renewals?",
      answer: "We assess rent payment history, property care based on inspections, lease compliance records, neighbor relations, and communication responsiveness. Excellent tenants may receive below-market increases to encourage retention."
    },
    {
      question: "What happens if tenants decline renewal offers?",
      answer: "We confirm move-out dates, schedule inspections, initiate marketing campaigns for replacement tenants, coordinate property preparation for showings, and manage overlapping timelines. This proactive approach minimizes vacancy periods between tenants."
    }
  ],
  "owner-tenant-communication": [
    {
      question: "How do I stay informed about my property's performance?",
      answer: "We provide 24/7 owner portal access to financial statements, maintenance records, inspection reports, proactive notifications for significant issues, monthly performance summaries, and quarterly strategy sessions for portfolio owners."
    },
    {
      question: "How quickly do you respond to tenant requests?",
      answer: "Our response time commitments include: emergency calls within 15 minutes, urgent maintenance requests within 2 hours, routine requests within 24 hours, and general inquiries within one business day. This ensures tenant satisfaction while protecting properties."
    },
    {
      question: "Do you provide multilingual communication support?",
      answer: "Yes, we provide Spanish language support, translation services for lease documents and critical communications, and cultural sensitivity training. This inclusive approach improves tenant satisfaction and reduces miscommunication issues."
    },
    {
      question: "How do you handle conflicts between owners and tenants?",
      answer: "We serve as neutral mediators applying lease terms and legal requirements, actively listening to all perspectives, gathering facts through documentation, developing reasonable solutions, and providing formal resolution documentation. Professional mediation resolves 90% of conflicts without legal action."
    },
    {
      question: "What communication channels do you use?",
      answer: "We provide online portals for account management, dedicated phone lines during business hours, 24/7 emergency hotlines, email communication for documentation, and scheduled meetings when complex issues require face-to-face discussion."
    }
  ],
  "property-marketing": [
    {
      question: "How do professional photos increase rental inquiries?",
      answer: "Professional photography increases inquiry rates by 300-400% compared to smartphone snapshots. Our photographers use wide-angle lenses, proper lighting, staged compositions, exterior shots, twilight photography for premium properties, and aerial drone photography for properties with acreage or views."
    },
    {
      question: "What platforms do you use to market rental properties?",
      answer: "We syndicate to Zillow, Trulia, Apartments.com, Rent.com, Craigslist, Facebook Marketplace, our website with SEO optimization, email campaigns to prospect databases, and local community boards. This omnichannel approach generates 500-700% more inquiries than single-platform marketing."
    },
    {
      question: "Do you create virtual tours and video content?",
      answer: "Yes, we create narrated video tours, 3D virtual tours for interactive exploration, neighborhood tours highlighting amenities, and amenity highlights for special features. These immersive experiences pre-qualify prospects and reduce time wasted on unqualified showings."
    },
    {
      question: "How do you determine optimal rental pricing?",
      answer: "Our pricing strategy analyzes comparable properties, seasonal demand variations, owner requirements, property condition versus competition, and vacancy cost scenarios. We maximize net present value rather than simply pursuing highest nominal rents."
    },
    {
      question: "What showing coordination services do you provide?",
      answer: "We pre-qualify prospects, schedule showings using online booking systems, conduct professional property tours, answer questions thoroughly, follow up with feedback and next steps, and nurture prospects through the decision process. This converts qualified prospects to applications at 40-50% higher rates than competitors."
    }
  ],
  "financial-reporting": [
    {
      question: "What detailed financial information do owners receive?",
      answer: "Monthly statements include income details, expense summaries, maintenance costs, management fees, property taxes, insurance, capital improvements, net cash flow, year-to-date comparisons, and detailed transaction breakdowns. All available through 24/7 owner portals."
    },
    {
      question: "How quickly are monthly statements available?",
      answer: "Monthly owner statements are available within 5 business days of month-end, providing timely financial information for informed decision-making and investment performance tracking."
    },
    {
      question: "Do you provide portfolio-level reporting for multiple properties?",
      answer: "Yes, we maintain separate ledgers for each property enabling performance comparison and property-specific analysis while providing consolidated portfolio reports for investors owning multiple properties."
    },
    {
      question: "How do you handle year-end tax documentation?",
      answer: "We provide IRS Form 1099 forms for contractors, Schedule E-formatted summaries, property tax verification, depreciation schedules, and detailed transaction registers. Many owners report our documentation saves 5-10 hours of accountant time and reduces professional fees."
    },
    {
      question: "What is included in the owner portal?",
      answer: "Owner portals provide 24/7 access to real-time financial information, historical statements and documents, work orders and maintenance activities, downloadable reports in multiple formats, trend analysis with graphical dashboards, and direct communication with property managers."
    }
  ],
  "hoa-management": [
    {
      question: "How do you ensure CC&R compliance for rental properties?",
      answer: "We maintain comprehensive knowledge of each HOA's governing documents, monitor tenant compliance, coordinate pre-approvals for modifications, respond promptly to violations with corrective action plans, and attend HOA meetings when property issues require representation."
    },
    {
      question: "What architectural review services do you provide?",
      answer: "We prepare architectural review applications, respond to committee questions, obtain formal approvals before commencing work, and document completion for HOA records. Our familiarity with local procedures expedites approvals while avoiding rejections."
    },
    {
      question: "How do you educate tenants about HOA rules?",
      answer: "During move-in orientations, we review community rules including parking restrictions, noise ordinances, trash procedures, pet restrictions, landscape maintenance expectations, common area usage, and architectural approval requirements to prevent violations."
    },
    {
      question: "How do you handle HOA violation notices?",
      answer: "Upon receiving violations, we assess situations immediately, develop corrective action plans, communicate with tenants, coordinate necessary repairs, respond to HOA management with documentation, and negotiate fine waivers when appropriate based on quick professional response."
    },
    {
      question: "What HOA fee management services do you provide?",
      answer: "We pay HOA dues from rental income, track special assessments, maintain records for tax purposes, analyze fee increases, and challenge unreasonable assessments. Proper management protects owners from payment defaults that can result in liens or foreclosure."
    }
  ],
  "vendor-management": [
    {
      question: "How do you select and vet contractors?",
      answer: "Our vendor vetting includes CSLB license verification, insurance confirmation, reference checks, pricing comparisons, test projects, and communication assessment. This rigorous process eliminates unreliable contractors before they impact your properties."
    },
    {
      question: "What services do your vendor categories include?",
      answer: "Our network includes general handymen, licensed plumbers, HVAC technicians, electricians, roofers, painters, landscapers, appliance repair specialists, and contractors for specialized work like pest control, asbestos abatement, and foundation repair."
    },
    {
      question: "How do you ensure competitive pricing for major projects?",
      answer: "For major projects, we solicit multiple bids with detailed scope specifications, compare pricing and approach, verify licensing and insurance, analyze total cost and timeline feasibility, and present recommendations based on value rather than just lowest price."
    },
    {
      question: "Do you have emergency vendor response agreements?",
      answer: "Yes, we maintain on-call vendor relationships committing to 2-4 hour response times for after-hours emergencies including plumbing leaks, heating failures, electrical hazards, security issues, and urgent safety concerns with pre-negotiated overtime rates."
    },
    {
      question: "How do you track vendor performance and quality?",
      answer: "We monitor completion timeframes, tenant satisfaction feedback, pricing versus market rates, inspect completed repairs, track warranty fulfillment, and conduct periodic performance reviews. Vendors consistently failing standards are removed or placed on probation."
    }
  ],
  "move-in-move-out-coordination": [
    {
      question: "What does move-in preparation include?",
      answer: "Move-in preparation includes professional cleaning, necessary repairs, touch-up painting, system testing, lock changes, carpet cleaning, landscape maintenance, and final walk-through verification. This thorough preparation creates positive impressions while preventing disputes."
    },
    {
      question: "How detailed is your move-in inspection documentation?",
      answer: "We conduct room-by-room evaluations with tenants present, photograph every surface, document existing wear and damage, test all systems, record meter readings, create detailed written descriptions, and obtain tenant signatures acknowledging accuracy for future reference."
    },
    {
      question: "What services do you provide during tenant turnover?",
      answer: "Turnover services include professional cleaning, repair coordination, marketing to qualified prospects, early showings when property condition permits, application processing, and new tenant scheduling. Professional coordination achieves 5-10 day vacancies versus 20-30 day market averages."
    },
    {
      question: "How do you handle security deposit accounting?",
      answer: "Within 21 days of move-out, we provide itemized statements, actual invoices for repairs, deductions for damages beyond normal wear and tear, cleaning charges, unpaid rent calculations, and refund remaining balances. California law imposes penalties for non-compliance making professional handling essential."
    },
    {
      question: "What pre-move-out inspection services do you offer?",
      answer: "We offer optional inspections 1-2 weeks before departure, identify cleaning and minor damage needs, provide punch lists, explain security deposit implications, answer tenant questions, and document inspection results preventing later disputes about communication."
    }
  ],
  "lease-compliance": [
    {
      question: "How do you enforce lease terms without damaging tenant relationships?",
      answer: "Our progressive enforcement approach prioritizes education and correction over immediate penalties, reserving aggressive enforcement for serious violations. We maintain clear documentation, communicate professionally, apply terms consistently, and escalate only when necessary."
    },
    {
      question: "What common lease violations do you monitor?",
      answer: "We monitor unauthorized occupants, unauthorized pets, excessive noise, parking violations, property damage, illegal activity, late rent patterns, landscape neglect, smoking violations, and unauthorized alterations. Early detection prevents minor issues from becoming major problems."
    },
    {
      question: "How do you handle unauthorized pets?",
      answer: "When unauthorized pets are discovered, we verify violations through inspection, issue notices requiring pet removal or proper authorization, collect pet deposits and monthly pet rent if approved, update leases with documentation, and ensure insurance coverage includes pet liability."
    },
    {
      question: "What is your approach to late rent enforcement?",
      answer: "Our systematic approach issues late notices on day 4, assesses late fees per lease terms, provides three-day pay-or-quit notices, and initiates eviction proceedings if tenants fail to cure. While working with temporary hardship cases, consistent enforcement prevents patterns of chronic delinquency."
    },
    {
      question: "How do you document lease violations for legal protection?",
      answer: "We photograph evidence when possible, collect witness statements, document dates and specific incidents, preserve communication with tenants, maintain inspection reports, and create timeline narratives. Thorough documentation proves essential when violations escalate to legal proceedings."
    }
  ],
  "emergency-support": [
    {
      question: "What constitutes a true emergency requiring after-hours response?",
      answer: "True emergencies include plumbing leaks causing water damage, heating failures during freezing weather, electrical failures or fire hazards, gas leaks, sewage backups, break-ins, storm damage, and medical/safety emergencies. Non-emergencies receive attention during business hours."
    },
    {
      question: "How quickly do you respond to emergency calls?",
      answer: "Our emergency system provides live person answering 24/7 with 15-minute maximum response time to calls, immediate escalation to on-call managers, and vendor dispatch for appropriate service types within 2-4 hours maximum."
    },
    {
      question: "What emergency vendor network do you maintain?",
      answer: "Our emergency vendor network includes 24/7 plumbers, HVAC technicians, electricians, locksmiths, restoration companies, and emergency board-up services. These vendors understand our properties, maintain emergency inventory, and provide priority service."
    },
    {
      question: "How do you handle water damage emergencies?",
      answer: "For water emergencies, we coordinate immediate water shut-off, deploy emergency extraction equipment within hours, remove damaged materials, document damage for insurance claims, arrange tenant relocation if necessary, and initiate restoration processes. Quick response often reduces repair costs by 60-80%."
    },
    {
      question: "Do you provide temporary relocation assistance?",
      answer: "Yes, for situations rendering properties uninhabitable, we identify temporary housing options, coordinate with owners regarding coverage and insurance, communicate with tenants about processes, arrange contractor access, and facilitate tenant return once properties are restored."
    }
  ],
  "insurance-risk-management": [
    {
      question: "What insurance requirements do you have for properties?",
      answer: "We require proof of property insurance before management, verify coverage limits meet property values, confirm liability coverage with $1 million minimums, review loss of rent provisions, verify umbrella policies, and coordinate with owner agents regarding coverage questions."
    },
    {
      question: "Do you require tenant renters insurance?",
      answer: "Yes, our leases mandate tenant renters insurance with minimum $100,000 liability coverage, personal property protection, loss of use coverage, and additional insured endorsements naming owners and management company. We verify insurance before move-in and monitor renewals."
    },
    {
      question: "How do you help reduce insurance claims and premiums?",
      answer: "We implement preventive maintenance, tenant education, regular inspections, quality contractor selection, lease enforcement, and security measures. Properties under professional management experience 40-50% fewer claims, directly reducing insurance costs over time."
    },
    {
      question: "What natural disaster preparedness do you provide?",
      answer: "We implement wildfire defensible space maintenance, coordinate emergency evacuation compliance, verify earthquake insurance coverage, prepare properties for winter storms, and maintain emergency response plans. This preparation reduces damage while ensuring coverage isn't voided by negligence."
    },
    {
      question: "How do you assist with insurance claims?",
      answer: "We document damage immediately, notify insurance companies within timeframes, provide detailed loss information, facilitate adjuster access, obtain contractor estimates, coordinate repairs after approval, and maintain documentation for disputes or supplemental claims."
    }
  ],
  "property-renovation-upgrades": [
    {
      question: "What renovation projects typically provide the best ROI?",
      answer: "Kitchen and bathroom upgrades consistently deliver highest ROI, often justifying $200-400 monthly rent increases while costing $10,000-25,000. Flooring updates, energy efficiency improvements, and exterior enhancements also provide strong returns depending on property type and market."
    },
    {
      question: "How do you determine if renovations are worthwhile?",
      answer: "We evaluate property conditions, analyze comparable properties, research rental rate premiums for improvements, calculate projected costs, model financial returns, and recommend priorities based on ROI analysis. This data-driven approach ensures positive returns rather than over-improvement."
    },
    {
      question: "What flooring options do you recommend for rental properties?",
      answer: "We recommend luxury vinyl plank (LVP) for durability and style, hardwood for premium properties, tile for bathrooms and entries, stain-resistant carpet for bedrooms, and laminate as budget-friendly alternatives. Selection considers tenant demographics, wear patterns, and maintenance requirements."
    },
    {
      question: "Do you manage renovation projects for property owners?",
      answer: "Yes, we manage projects including contractor selection through competitive bidding, scope development, timeline management, quality oversight, change order coordination, code compliance verification, and completion verification. Active management prevents cost overruns and quality issues."
    },
    {
      question: "How do you determine appropriate rental rate increases after renovations?",
      answer: "After improvements, we research updated comparables with similar upgrades, calculate competitive rates for improved properties, recommend rent increases aligned with improvements and market conditions, and prepare marketing highlighting upgrades for tenant demographics willing to pay premium rents."
    }
  ],
  "legal-compliance": [
    {
      question: "How do you ensure Fair Housing Law compliance?",
      answer: "We ensure strict adherence to Fair Housing Act protections, maintain uniform application of rental criteria, document objective decision-making, ensure consistent lease enforcement, accommodate disability requests, and conduct regular staff training. Violations can result in six-figure penalties."
    },
    {
      question: "What local rent control ordinances do you handle?",
      answer: "We maintain current knowledge of local ordinances including maximum rent increases, permissible reasons for owner move-in, relocation payment requirements, exemptions for newer construction, and registration obligations. This prevents penalties while enabling lawful rent adjustments."
    },
    {
      question: "How do you handle California security deposit requirements?",
      answer: "We follow strict requirements limiting deposits to two months' rent (three for furnished), provide itemized accounting within 21 days, restrict deductions to unpaid rent, cleaning beyond normal wear, and damage repairs, and maintain documentation to withstand disputes."
    },
    {
      question: "What habitability standards must rental properties meet?",
      answer: "California's implied warranty requires functional plumbing, heating, electrical systems, weather-tight structures, clean conditions, adequate trash receptacles, working deadbolt locks, smoke/CO detectors, and freedom from pest infestations. We conduct regular inspections and coordinate prompt repairs."
    },
    {
      question: "How do you handle required disclosures to tenants?",
      answer: "We maintain comprehensive disclosure checklists covering lead-based paint (pre-1978), registered sex offender information, pest control contacts, utility arrangements, rental registration numbers, owner contact information, and security deposit procedures provided at lease signing."
    }
  ],
  "short-term-rental-management": [
    {
      question: "What platforms do you use for vacation rental marketing?",
      answer: "We create listings on Airbnb and VRBO, manage proprietary booking websites, syndicate to TripAdvisor and Google Vacation Rentals, and coordinate availability calendars preventing double-bookings. Multi-channel distribution increases bookings 40-60% compared to single-platform strategies."
    },
    {
      question: "How do you optimize pricing for vacation rentals?",
      answer: "Our revenue management analyzes historical patterns, monitors competitor pricing, adjusts rates for seasons and events, implements minimum stays during high-demand periods, offers strategic discounts during slower seasons, and utilizes automated pricing software. This typically increases annual revenue 20-35%."
    },
    {
      question: "What turnover and housekeeping services do you provide?",
      answer: "Our turnover process includes professional cleaning to hospitality standards, linen laundering, amenity restocking, property inspection, lock code changes, and readiness verification. Same-day turnover capabilities allow back-to-back bookings during peak seasons."
    },
    {
      question: "How do you ensure compliance with vacation rental regulations?",
      answer: "We research local ordinances, obtain required business licenses, register properties, collect and remit transient occupancy taxes, maintain good neighbor policies, respond to complaints, and document compliance. Regulations vary significantly by jurisdiction requiring professional expertise."
    },
    {
      question: "What guest communication and support services do you provide?",
      answer: "We handle booking inquiries, send pre-arrival communications with instructions, provide during-stay support, coordinate check-in/out requests, conduct post-stay follow-up requesting reviews, and maintain 24/7 support. Professional communication generates positive reviews driving future bookings."
    }
  ],
  "portfolio-management": [
    {
      question: "What reporting do you provide for multiple property portfolios?",
      answer: "Portfolio reporting includes consolidated analytics tracking total revenue, occupancy rates, operating expenses, cash-on-cash returns, property comparisons, tenant turnover patterns, maintenance trends, and capital improvement needs across all properties."
    },
    {
      question: "How do you identify underperforming properties in portfolios?",
      answer: "We compare properties within portfolios and against market averages, identify below-average occupancy, excessive maintenance costs, poor tenant retention, below-market rental rates, and other performance gaps. This enables targeted intervention improving overall returns."
    },
    {
      question: "What capital allocation strategies do you recommend?",
      answer: "We recommend concentrating investments where returns will be highest, completing improvements between tenant turnovers, addressing deferred maintenance systematically, prioritizing properties in appreciating neighborhoods, and deferring low-priority improvements on properties potentially held for sale."
    },
    {
      question: "Do you help with property acquisition due diligence?",
      answer: "Yes, we conduct market analysis confirming rent assumptions, evaluate property conditions identifying deferred maintenance, assess financial projections, analyze management complexity, and determine portfolio fit. This prevents problematic purchases that drag down performance."
    },
    {
      question: "How do you support property disposition and sale preparation?",
      answer: "We provide market timing recommendations, coordinate property improvements maximizing sale values, compile comprehensive records for buyer due diligence, provide historical financial performance, coordinate tenant relations during sales, and recommend pricing strategies balancing speed and value."
    }
  ]
};