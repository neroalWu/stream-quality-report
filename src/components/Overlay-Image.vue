<script setup lang="ts">
defineProps({
    imageSrc: String
})
</script>

<template>
    <div id="overlay">
 
        <img :src=imageSrc alt="Image" />
     
    </div>
</template>

<style scoped>
#overlay {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2); /* 半透明的黑色背景 */
    justify-content: center;
    align-items: center;
}


img {
    width: 60%;
    height: auto;
    border-radius: 10px;
    justify-content: center;
}
</style>
