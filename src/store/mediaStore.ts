import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {ConsumptionEntry, WeeklyGoal} from '../types';
import { startOfWeek } from 'date-fns';

interface MediaStore {
    entries: ConsumptionEntry[];
    weeklyGoal: WeeklyGoal;
    addEntry: (entry: Omit<ConsumptionEntry, 'id'>) => void;
    deleteEntry: (id: string) => void;
    getWeekProgress: () => number;
    resetWeekIfNeeded: () => void;
}

export const useMediaStore = create<MediaStore>()(
    persist(
        (set, get) => ({
            entries: [],
            weeklyGoal: {
                target: 3,
                current: 0,
                weekStart: startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday
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

            deleteEntry: (id) => {
                set((state) => ({
                    entries: state.entries.filter((e) => e.id !== id)
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