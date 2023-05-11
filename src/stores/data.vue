<script>
    import { ref, computed } from 'vue'
    import { defineStore } from 'pinia'

    export const useDataStore = defineStore('data', {
        state: () => {
            return {
                data: {
                    "Bench Press": {
                            "3.05.2023": [{set: 1, weight: 100, reps: 10}, {set: 2, weight: 100, reps: 8}, {set: 3, weight: 100, reps: 6}],
                        },
                       "Squat": {
                            "03.05.2023": [{set: 1, weight: 120, reps: 10}, {set: 2, weight: 120, reps: 8}, {set: 3, weight: 120, reps: 6}]
                        },
                },
                currentExercises: [],
                history: {
                    "11.05.2023": {
                        "Bench Press": [{set: 1, weight: 99, reps: 15}],
                        "Dips": [{set: 1, weight: 20, reps: 12}, {set: 2, weight: 20, reps: 10}],
                    },
                    "12.05.2023": {
                        "Squat": [{set: 1, weight: 122, reps: 10}, {set: 2, weight: 111, reps: 9}],
                    }
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

