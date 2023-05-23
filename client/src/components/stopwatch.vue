<template>
    <div class="timer">{{ this.timeElapsed  }}</div>
</template>

<script>
    export default {
        data() {
            return {
                startTime: "",
                now: Date.now(),
                timeElapsed: "",
            }
        },
        methods:{
            start() {
                this.startTime = new Date();
                console.log(this.startTime);
                const updateTime = setInterval(() => {
                    this.now = new Date();
                    const hours = Math.floor((this.now.valueOf() - this.startTime.valueOf())/1000/60/60);
                    const minutes = Math.floor((this.now.valueOf() - this.startTime.valueOf())/1000/60 % 60);
                    const seconds = Math.floor((this.now.valueOf() - this.startTime.valueOf())/1000 % 60);
                    this.timeElapsed = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
                }, 1000);
                if(this.showBody == false){clearInterval(updateTime);}
            }
        },
        props: {
            showBody: {
                type: Boolean,
                required: true,
            }
        },
        mounted() {
            this.start();
        }
    }
</script>

<style scoped>

</style>