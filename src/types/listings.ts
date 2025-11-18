/**
 * Configuration options for the Appfolio Listings widget
 */
export interface ListingsWidgetConfig {
  /**
   * The Appfolio host URL (subdomain.appfolio.com)
   */
  hostUrl: string;

  /**
   * Optional property group name to filter listings
   */
  propertyGroup?: string;

  /**
   * Theme color for the widget (hex color)
   * @default "#F8F6F"
   */
  themeColor: string;

  /**
   * Height of the widget container
   * @default "800px"
   */
  height: string;

  /**
   * Width of the widget container
   * @default "100%"
   */
  width: string;

  /**
   * Default sort order for listings
   * @default "date_posted"
   */
  defaultOrder: "date_posted" | "price" | "bedrooms" | "name";
}

/**
 * Analytics event types for listings interactions
 */
export type ListingsEventType =
  | "widget_loaded"
  | "widget_error"
  | "listing_viewed"
  | "listing_clicked"
  | "filter_applied"
  | "search_performed";

/**
 * Analytics event properties
 */
export interface ListingsAnalyticsEvent {
  event: ListingsEventType;
  properties?: {
    error_type?: string;
    listing_id?: string;
    filter_type?: string;
    search_query?: string;
    [key: string]: unknown;
  };
}
