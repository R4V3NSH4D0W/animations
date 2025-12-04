export interface TimelineItem {
  from: string;
  to: string;
}

export interface Experience extends TimelineItem {
  company: string;
  position: string;
  image?: string;
  description?: string;
  details?: string;
}

export interface Education extends TimelineItem {
  school: string;
  degree: string;
  image?: string;
  description?: string;
  details?: string;
}

export interface Achievement {
  year: string;
  title: string;
  organization: string;
  image?: string;
  description?: string;
  details?: string;
}

export interface Recognition {
  year: string;
  award: string;
  issuedBy: string;
  image?: string;
  description?: string;
  details?: string;
}
