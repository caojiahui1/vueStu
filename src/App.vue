<template>
  <div id="app"> 
  <My>2122</My>  
    <router-view>
    	<header>1112</header>
    </router-view>
    
  </div>
</template>

<script>
import My from '@/components/header'
export default {
  component:{My},
  name: 'app'
}
</script>

<style>
html,body{padding: 0;margin: 0}
a{text-decoration: none;}

</style>
