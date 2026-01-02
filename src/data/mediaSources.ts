import type {MediaSource} from '../types';

export const mediaSources: MediaSource[] = [
    {
        id: 'hard-fork',
        name: 'Hard Fork',
        type: 'podcast',
        frequency: 'Twice Weekly',
        publishDays: [1, 4], // monday, thurs
        duration: '45 min',
        topics: ['AI', 'Tech News', 'Policy', 'Silicon Valley'],
        bestFor: ['California apps', 'Staying current', 'AI trends'],
        url: 'https://www.nytimes.com/column/hard-fork'
    },
    {
        id: 'se-daily',
        name: 'Software Engineering Daily',
        type: 'podcast',
        frequency: 'Daily',
        publishDays: [1, 2, 3, 4, 5], // all weekdays
        duration: '60 min',
        topics: ['System Design', 'Databases', 'Frameworks', 'Architecture'],
        bestFor: ['Technical interviews', 'Deep dives', 'All regions'],
        url: 'https://softwareengineeringdaily.com/'
    },
    {
        id: 'changelog',
        name: 'The Changelog',
        type: 'podcast',
        frequency: 'Weekly',
        publishDays: [1], // monday
        duration: '60 min',
        topics: ['Open Source', 'Developer Tools', 'Community'],
        bestFor: ['Startup culture', 'Dev tools', 'CA/Boston'],
        url: 'https://changelog.com/podcast'
    },
    {
        id: 'syntax',
        name: 'Syntax',
        type: 'podcast',
        frequency: 'Twice Weekly',
        publishDays: [1, 3], // monday, wed
        duration: '45 min',
        topics: ['Web Development', 'React', 'TypeScript', 'CSS'],
        bestFor: ['Frontend roles', 'Full-stack', 'Practical tips'],
        url: 'https://syntax.fm/'
    },
    {
        id: 'tldr',
        name: 'TLDR',
        type: 'newsletter',
        frequency: 'Daily',
        publishDays: [1, 2, 3, 4, 5], // all weekdays
        duration: '5 min',
        topics: ['Tech News', 'Startups', 'Dev Tools', 'AI'],
        bestFor: ['Quick updates', 'All applications'],
        url: 'https://tldr.tech/'
    },
    {
        id: 'bytebytego',
        name: 'ByteByteGo',
        type: 'newsletter',
        frequency: 'Weekly',
        publishDays: [1], // monday
        duration: '10 min',
        topics: ['System Design', 'Architecture', 'Scalability'],
        bestFor: ['Technical interviews', 'System design prep'],
        url: 'https://blog.bytebytego.com/'
    },
    {
        id: 'pointer',
        name: 'Pointer',
        type: 'newsletter',
        frequency: 'Weekly',
        publishDays: [4], // thurs
        duration: '10 min',
        topics: ['Curated Articles', 'Engineering', 'Best Practices'],
        bestFor: ['Variety', 'Quality content'],
        url: 'https://www.pointer.io/'
    },
    {
        id: 'pragmatic-engineer',
        name: 'The Pragmatic Engineer',
        type: 'newsletter',
        frequency: 'Biweekly',
        publishDays: [2, 5], // tuesday and friday
        duration: '15 min',
        topics: ['Career', 'Big Tech', 'Engineering Culture'],
        bestFor: ['Career advice', 'Understanding companies'],
        url: 'https://newsletter.pragmaticengineer.com/'
    }
];