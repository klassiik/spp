"use client";

import { 
  Home, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Menu,
  X,
  Search,
  Star,
  DollarSign,
  Users,
  Wrench,
  Shield,
  Clock,
  Award,
  FileText,
  Target,
  BarChart3,
  UserCheck,
  Calendar,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Settings,
  Info,
  HelpCircle,
  TrendingUp,
  Eye,
  EyeOff,
  Heart,
  Share2,
  Bookmark,
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  MoreVertical,
  Minus,
  Plus,
  Loader,
  Check,
  XCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  VolumeX,
  Brightness,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Headphones,
  Camera,
  Video,
  Image,
  File,
  Folder,
  FolderOpen,
  BookmarkIcon,
  Flag,
  Tag,
  Link,
  Unlink,
  Edit,
  Trash2,
  Save,
  Cancel,
  Upload,
  Download as DownloadIcon,
  Print,
  Share,
  Send,
  Receive,
  Wallet,
  CreditCard,
  DollarSignIcon
} from "lucide-react";

// Icon registry for tree-shaking
const ICONS = {
  // Navigation & UI
  home: Home,
  building: Building2,
  phone: Phone,
  mail: Mail,
  map: MapPin,
  arrowRight: ArrowRight,
  menu: Menu,
  close: X,
  search: Search,
  filter: Filter,
  moreVertical: MoreVertical,
  
  // Status & Feedback
  check: CheckCircle2,
  alert: AlertTriangle,
  error: XCircle,
  warning: AlertCircle,
  success: Check,
  loading: Loader,
  refresh: RefreshCw,
  
  // Content
  star: Star,
  bookmark: Bookmark,
  share: Share2,
  external: ExternalLink,
  link: Link,
  copy: Copy,
  edit: Edit,
  trash: Trash2,
  
  // Business & Services
  users: Users,
  userCheck: UserCheck,
  dollarSign: DollarSign,
  target: Target,
  chart: BarChart3,
  trending: TrendingUp,
  clock: Clock,
  calendar: Calendar,
  
  // Media & Assets
  image: Image,
  video: Video,
  file: File,
  folder: Folder,
  download: Download,
  upload: Upload,
  
  // Settings & Controls
  settings: Settings,
  info: Info,
  help: HelpCircle,
  theme: Moon,
  
  // Property Types
  homeIcon: Home,
  buildingIcon: Building2,
  shield: Shield,
  wrench: Wrench,
  
  // Time & Status
  time: Clock,
  award: Award,
  fileText: FileText,
  eye: Eye,
  
  // Common actions
  plus: Plus,
  minus: Minus,
  sortAsc: SortAsc,
  sortDesc: SortDesc,
  grid: Grid3X3,
  list: List,
  save: Save,
  cancel: Cancel,
  print: Print,
  send: Send,
  receive: Receive,
  
  // Financial
  wallet: Wallet,
  creditCard: CreditCard,
  
  // Communication
  message: MessageSquare,
  
  // Visual indicators
  wifi: Wifi,
  brightness: Brightness,
  volume: Volume2,
  
  // Device types
  smartphone: Smartphone,
  monitor: Monitor,
  tablet: Tablet,
  laptop: Laptop,
  
  // Common nouns
  tag: Tag,
  flag: Flag,
  bookmarkIcon: BookmarkIcon,
  heart: Heart,
  linkIcon: Link,
  mailIcon: Mail,
  phoneIcon: Phone,
  
  // File types
  folderOpen: FolderOpen,
  
  // Visual states
  eyeOff: EyeOff,
  volumeX: VolumeX,
  wifiOff: WifiOff,
  moon: Moon,
  sun: Sun,
  battery: Battery,
  
  // Common icons
  downloadIcon: Download,
  externalLink: ExternalLink,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  shareIcon: Share2,
  mailIcon: Mail,
  phoneIcon: Phone,
  
  // Dollar variants
  dollarSignIcon: DollarSign,
  
  // Headphones
  headphones: Headphones,
  
  // Camera
  camera: Camera,
} as const;

// Icon component wrapper with optimized rendering
interface IconProps {
  name: keyof typeof ICONS;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number;
  className?: string;
  strokeWidth?: number;
  color?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export function OptimizedIcon({
  name,
  size = "md",
  className = "",
  strokeWidth = 2,
  color,
  ariaLabel,
  ariaHidden = false,
}: IconProps) {
  const IconComponent = ICONS[name];
  
  // Convert size string to pixel values
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    "2xl": 48,
  } as const;
  
  const iconSize = typeof size === "number" ? size : sizeMap[size] || sizeMap.md;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in registry`);
    return null;
  }
  
  return (
    <IconComponent
      width={iconSize}
      height={iconSize}
      strokeWidth={strokeWidth}
      color={color}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    />
  );
}

// Icon button component with proper accessibility
interface IconButtonProps {
  icon: keyof typeof ICONS;
  variant?: "default" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  variant = "default",
  size = "md",
  ariaLabel,
  onClick,
  disabled = false,
  loading = false,
  className = "",
}: IconButtonProps) {
  const baseClasses = [
    "inline-flex items-center justify-center rounded-md transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" ");
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  };
  
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };
  
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled || loading}
      onClick={onClick}
      className={[baseClasses, variantClasses[variant], sizeClasses[size], className].join(" ")}
    >
      {loading ? (
        <OptimizedIcon
          name="loading"
          size="sm"
          className="animate-spin"
          ariaHidden={true}
        />
      ) : (
        <OptimizedIcon
          name={icon}
          size="sm"
          ariaHidden={true}
        />
      )}
    </button>
  );
}

// Icon grid for displaying multiple icons efficiently
export function IconGrid({
  icons,
  columns = 3,
  gap = "md",
  className = "",
}: {
  icons: Array<{
    name: keyof typeof ICONS;
    label: string;
    onClick?: () => void;
  }>;
  columns?: number;
  gap?: "sm" | "md" | "lg";
  className?: string;
}) {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };
  
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  };
  
  return (
    <div className={["grid", columnClasses[columns], gapClasses[gap], className].join(" ")}>
      {icons.map((item) => (
        <button
          key={item.name}
          type="button"
          className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-colors"
          onClick={item.onClick}
          aria-label={item.label}
        >
          <OptimizedIcon
            name={item.name}
            size="lg"
            ariaHidden={true}
          />
          <span className="text-xs text-center">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// Lazy icon loader for dynamic imports
export function LazyIcon({
  name,
  fallback: FallbackIcon = "loading",
  ...props
}: IconProps & { fallback?: keyof typeof ICONS }) {
  // This component demonstrates dynamic loading pattern
  // In practice, you'd use React.lazy() and Suspense
  
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <OptimizedIcon
        name={fallback}
        {...props}
        className="animate-pulse opacity-50"
      />
    );
  }
  
  if (error) {
    return (
      <OptimizedIcon
        name="alert"
        size="sm"
        className="text-muted-foreground"
        ariaHidden={true}
      />
    );
  }
  
  return (
    <OptimizedIcon
      name={name}
      {...props}
    />
  );
}

// Common icon combinations for consistent design
export const ICON_COMBINATIONS = {
  // Service cards
  services: {
    residential: "home",
    commercial: "building",
    maintenance: "wrench",
    leasing: "userCheck",
  },
  
  // Status indicators
  status: {
    success: "check",
    error: "XCircle",
    warning: "AlertCircle",
    loading: "loading",
  },
  
  // Navigation
  navigation: {
    menu: "menu",
    close: "close",
    search: "search",
    filter: "filter",
    external: "externalLink",
  },
  
  // Business info
  business: {
    phone: "phone",
    email: "mail",
    location: "map",
    website: "externalLink",
  },
  
  // Actions
  actions: {
    edit: "edit",
    delete: "trash",
    save: "save",
    cancel: "cancel",
    download: "download",
    share: "share",
  },
} as const;

// Export individual icons for backward compatibility
export {
  Home,
  Building2,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Menu,
  X,
  Search,
  Star,
  DollarSign,
  Users,
  Wrench,
  Shield,
  Clock,
  Award,
  FileText,
  Target,
  BarChart3,
  UserCheck,
  Calendar,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  Settings,
  Info,
  HelpCircle,
  TrendingUp,
  Eye,
  EyeOff,
  Heart,
  Share2,
  Bookmark,
  Filter,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  MoreVertical,
  Plus,
  Minus,
  Loader,
  Check,
  XCircle,
  AlertCircle,
  Wifi,
  WifiOff,
  Battery,
  Volume2,
  VolumeX,
  Brightness,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Headphones,
  Camera,
  Video,
  Image,
  File,
  Folder,
  FolderOpen,
  Flag,
  Tag,
  Link,
  Unlink,
  Save,
  Cancel,
  Upload,
  Print,
  Send,
  Receive,
  Wallet,
  CreditCard,
};

// React import for LazyIcon
import React from "react";
