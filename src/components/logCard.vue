<template>
    <div class="log-card">
        <div class="card-header">
            <div>{{ this.title }}</div>
            <button @click="handleDelete(this.title)" class="orange-btn">X</button>
        </div>
        <div class="log-container">
            <div class="title-set">Set</div>
            <div class="title-weight">weight</div>
            <div class="title-reps">Reps</div>
            <template v-for="object in this.array ">
                    <div>{{ object.set }}</div>
                    <div>{{ object.weight }}kg</div>
                    <div>{{ object.reps }}</div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleDelete(prop) {
                console.log("moin");
                this.$emit("deleteEntry", prop);
            }
        },
        props: {
            title: {
                type: String,
                required: true,
            },
            array: {
                type: Array,
                required: true,
            },
        },
        emits: ["deleteEntry"],
    }
</script>

<style scoped>
    .log-card {
        border: 1px solid rgba(0, 0, 0, 0.05);
        background-color: #f9f9f9;
        margin: 15px 0px;
        padding: 10px 20px;
    }

    .card-header {
        display: grid;   
        grid-template-columns: 1fr 1fr 1fr ;    
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .card-header div {
        grid-column: 2/2;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
    }

    .card-header button {
        grid-column: 3/3;
        border: none;
        background-color: #f9f9f9;
        color: red;
        font-size: 1.3rem;
    }

    .log-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
        padding-top: 10px;
    }

    .log-container div {
        text-align: center;
    }

    .title-set {
        grid-row: 1/1;
        grid-column: 1/1;
    }

    .title-weight {
        grid-row: 1/1;
        grid-column: 2/2;
    }

    .title-reps {
        grid-row: 1/1;
        grid-column: 3/3;
    }
</style>