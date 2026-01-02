import type {MediaSource, ConsumptionEntry} from '../types';
import { mediaSources } from '../data/mediaSources';

export interface Recommendation {
    source: MediaSource;
    reason: string;
    priority: number;
}

export function getDailyRecommendations(
    entries: ConsumptionEntry[],
    weekProgress: number
): Recommendation[] {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const recommendations: Recommendation[] = [];

    // entries from this week
    const thisWeekEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        const daysDiff = Math.floor(
            (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysDiff < 7;
    });

    const consumedSourceIds = new Set(thisWeekEntries.map((e) => e.sourceId));

    // first priority
    const todaysSources = mediaSources.filter(
        (source) =>
            source.publishDays?.includes(dayOfWeek) &&
            !consumedSourceIds.has(source.id)
    );

    todaysSources.forEach((source) => {
        recommendations.push({
            source,
            reason: 'New episode/issue published today!',
            priority: 1
        });
    });

    // second priority (if behind on weekly and it's the weekend)
    if (weekProgress < 3 && (dayOfWeek === 0 || dayOfWeek === 6)) {
        const quickContent = mediaSources.filter(
            (source) =>
                source.duration &&
                parseInt(source.duration) <= 10 &&
                !consumedSourceIds.has(source.id)
        );

        quickContent.forEach((source) => {
            if (!recommendations.find((r) => r.source.id === source.id)) {
                recommendations.push({
                    source,
                    reason: 'Quick read to meet your weekly goal',
                    priority: 2
                });
            }
        });
    }

    // podcasts not heard from this week
    const unconsumedPodcasts = mediaSources.filter(
        (source) =>
            source.type === 'podcast' && !consumedSourceIds.has(source.id)
    );

    unconsumedPodcasts.slice(0, 2).forEach((source) => {
        if (!recommendations.find((r) => r.source.id === source.id)) {
            recommendations.push({
                source,
                reason: "You haven't listened to this yet this week",
                priority: 3
            });
        }
    });

    // always recommend tldr
    const todayEntries = entries.filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === today.toDateString();
    });

    const tldrConsumedToday = todayEntries.some(
        (entry) => entry.sourceId === 'tldr'
    );

    if (!tldrConsumedToday) {
        const tldr = mediaSources.find((s) => s.id === 'tldr');
        if (tldr && !recommendations.find((r) => r.source.id === 'tldr')) {
            recommendations.push({
                source: tldr,
                reason: 'Daily tech news brief',
                priority: 1
            });
        }
    }

    // sorting
    return recommendations
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 3);
}