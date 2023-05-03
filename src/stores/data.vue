<script>
    import { ref, computed } from 'vue'
    import { defineStore } from 'pinia'

    export const useDataStore = defineStore('data', {
        state: () => {
            return {
                data: {"Bench Press": 
                        {sets: {
                            "3.05.2023": [{set: 1, weight: 100, reps: 10}, {set: 2, weight: 100, reps: 8}, {set: 1, weight: 100, reps: 6}],

                            }
                        },
                       "Squat": 
                        {sets: {
                            "03.05.2023": [{set: 1, weight: 120, reps: 10}, {set: 2, weight: 120, reps: 8}, {set: 1, weight: 120, reps: 6}]
                            }
                        },
                },
                date: "",
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

