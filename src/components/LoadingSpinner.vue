<template>
    <div class="loader">

    </div>
</template>
      
<script>

export default {
    name: 'LoadingSpinner',
}
</script>

<style>
.loader {
    width: 120px;
    height: 120px;
    margin-top: -60px;
    margin-bottom: 0px;
    margin-right: 0px;
    margin-left: -60px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #42b983;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
