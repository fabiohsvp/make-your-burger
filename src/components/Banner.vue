<template>
    <div id="main-banner">
        <h1>BurgãoOZ</h1>
    </div>
</template>

<script>
export default {
    name: "Banner"
}
</script>

<style scoped>
    #main-banner {
        background-image: url('/public/img/burger.jpg');
        background-position: 0 -350px;
        background-size: cover;
        height: 700px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-repeat: no-repeat;
    }

    #main-banner h1 {
        color: #fff;
        text-align: center;
        font-size: 60px;
        background-color: #222;
        padding: 20px 40px;
    }
</style>