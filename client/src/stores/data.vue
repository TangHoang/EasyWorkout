<script>
    import { ref, computed } from 'vue'
    import { defineStore } from 'pinia'

    export const useDataStore = defineStore('data', {
        state: () => {
            return {
                data: {
                    "Bench Press": {
                        "16. Mai 23": [{set: 1, weight: 100, reps: 10}, {set: 2, weight: 100, reps: 8}, {set: 3, weight: 100, reps: 6}],
                        },
                    "Squat": {
                        "16. Mai 23": [{set: 1, weight: 120, reps: 10}, {set: 2, weight: 120, reps: 8}, {set: 3, weight: 120, reps: 6}]
                        },
                    "Dips": {
                        "16. Mai 23": [{set: 1, weight: 10, reps: 10}, {set: 2, weight: 10, reps: 8}, {set: 3, weight: 10, reps: 6}]
                    }
                },
                currentExercises: [],
                history: {
                    "16. Mai 23": {
                        "Bench Press": [{set: 1, weight: 100, reps: 10}, {set: 2, weight: 100, reps: 8}, {set: 3, weight: 100, reps: 6}],
                        "Dips": [{set: 1, weight: 10, reps: 10}, {set: 2, weight: 10, reps: 8}, {set: 3, weight: 10, reps: 6}],
                        "Squat": [{set: 1, weight: 120, reps: 10}, {set: 2, weight: 120, reps: 8}, {set: 3, weight: 120, reps: 6}],
                    },
                }
            } 
        },
        actions: {
            getDate(){
                let temp = new Date()
                this.date = temp.toLocaleDateString("de-DE", {dateStyle: "medium"});
            }
        }
    })
</script>

