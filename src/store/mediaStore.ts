import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {ConsumptionEntry, WeeklyGoal, MediaSource} from '../types';
import { startOfWeek } from 'date-fns';

interface MediaStore {
    entries: ConsumptionEntry[];
    customSources: MediaSource[];
    weeklyGoal: WeeklyGoal;
    addEntry: (entry: Omit<ConsumptionEntry, 'id'>) => void;
    updateEntry: (id: string, updates: Partial<ConsumptionEntry>) => void;
    deleteEntry: (id: string) => void;
    addCustomSource: (source: MediaSource) => void;
    deleteCustomSource: (id: string) => void;
    getWeekProgress: () => number;
    resetWeekIfNeeded: () => void;
}

export const useMediaStore = create<MediaStore>()(
    persist(
        (set, get) => ({
            entries: [],
            customSources: [],
            weeklyGoal: {
                target: 3,
                current: 0,
                weekStart: startOfWeek(new Date(), { weekStartsOn: 1 })
            },

            addEntry: (entry) => {
                const newEntry: ConsumptionEntry = {
                    ...entry,
                    id: Date.now().toString(),
                    date: new Date()
                };

                set((state) => ({
                    entries: [...state.entries, newEntry],
                    weeklyGoal: {
                        ...state.weeklyGoal,
                        current: state.weeklyGoal.current + 1
                    }
                }));
            },

            updateEntry: (id, updates) => {
                set((state) => ({
                    entries: state.entries.map((entry) =>
                        entry.id === id ? { ...entry, ...updates } : entry
                    )
                }));
            },

            deleteEntry: (id) => {
                set((state) => ({
                    entries: state.entries.filter((e) => e.id !== id)
                }));
            },

            addCustomSource: (source) => {
                set((state) => ({
                    customSources: [...state.customSources, source]
                }));
            },

            deleteCustomSource: (id) => {
                set((state) => ({
                    customSources: state.customSources.filter((s) => s.id !== id)
                }));
            },

            getWeekProgress: () => {
                const { entries, weeklyGoal } = get();
                const weekStart = weeklyGoal.weekStart;

                const thisWeekEntries = entries.filter(
                    (entry) => new Date(entry.date) >= weekStart
                );

                return thisWeekEntries.length;
            },

            resetWeekIfNeeded: () => {
                const today = new Date();
                const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
                const { weeklyGoal } = get();

                if (currentWeekStart > weeklyGoal.weekStart) {
                    set({
                        weeklyGoal: {
                            target: weeklyGoal.target,
                            current: 0,
                            weekStart: currentWeekStart
                        }
                    });
                }
            }
        }),
        {
            name: 'media-tracker-storage'
        }
    )
);