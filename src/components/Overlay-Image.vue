<script setup lang="ts">

const props = defineProps({
    imageSrc: String
})

console.log('image url:', props.imageSrc)
</script>

<template>
    <div id="overlay">
        <div id="overlay-content">
            <img :src="imageSrc" alt="Image" />
        </div>
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

#overlay-content {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

img {
    max-width: 1280px;
    border-radius: 10px;
}
</style>
