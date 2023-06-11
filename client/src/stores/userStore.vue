<script>
    import { defineStore } from 'pinia';
    import { ref, computed } from 'vue';

    export const useUserStore = defineStore("user", {
        state: () => {
            return {
                user: {
                    name: "Max Mustermann",
                    email: "max@gmail.com",
                    id: "",
                }
            }
        }
    })
</script>


