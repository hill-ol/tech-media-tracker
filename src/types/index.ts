export type MediaType = 'podcast' | 'newsletter' | 'article' | 'video';

export interface MediaSource {
    id: string;
    name: string;
    type: MediaType;
    frequency: string;
    publishDays?: number[]; // 0 = sunday
    duration?: string;
    topics: string[];
    bestFor: string[]
    url?: string;
}

export interface ConsumptionEntry {
    id: string;
    sourceId: string;
    sourceName: string;
    type: MediaType;
    title: string;
    date: Date;
    keyInsight: string;
    interviewAngle?: string;
    topics: string[];
}

export interface WeeklyGoal {
    target: number;
    current: number;
    weekStart: Date;
}