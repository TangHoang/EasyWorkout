<template>
    <div class="list-item">
        <div v-if="showConfirm == false" @click="handleClick(this.title)"> {{ this.title }}</div>
        <div class="warning-msg" v-if="showConfirm == true">Your data will be lost forever. Are you sure?</div>
        <button v-if="showConfirm == false" class="delete-btn" @click="showConfirm = true">X</button>
        <button class="return-btn" v-if="showConfirm" @click="showConfirm = false">Return</button>
        <button class="confirm-btn" v-if="showConfirm" @click="deleteItem(this.title)">Delete</button>
    </div>
</template>

<script>
    import { useDataStore } from '../stores/data.vue';
    export default {
        setup(){
            const trainingData = useDataStore();
            return {trainingData};
        },
        data() {
            return {
                showConfirm: false,
            }
        },
        methods: {
            handleClick(currentItem) {
                this.$emit("showDetailPage", currentItem);
            },
            deleteItem(item) {
                this.$emit("deleteEntry", item);
                this.showConfirm = false;
            },
        },
        props: {
            title: {
                type: String,
                required: true,
            }
        },
        emits: ["showDetailPage", "deleteEntry"],
    }
</script>

<style>
    .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: left;
        width: 100%;
        height: 100%;
        height: 40px;
        font-size: 1.3em;
        vertical-align: middle;
        border-top: 1px solid rgba(0,0,0, 0.2);
    }

    .delete-btn {
        border: none;
        background-color: #ffffff;
        color: red;
        font-size: 1.3rem;
        padding-right: 15px;
    }

    .return-btn {
        border: 1px solid green;
        background-color: #ffffff;
        font-size: 1rem;
        margin-left: 5px;
    }

    .confirm-btn {
        border: 1px solid red;
        background-color: #ffffff;
        font-size: 1rem;
        margin-left: 5px;
    }
</style>