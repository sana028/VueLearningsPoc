<template>
<header>
        <nav class="nav-bar">
            <div class="nav-logo">
                <span class="logo"><a href="#">CodiGO!</a></span>
                <div class="logo-bar">
                    <i class="gg-menu"></i>
                </div>

            </div>
            <div class="nav-menu">
                
                <div class="sidebar">
                    <span class="logo"><a href="#">CodiGO!</a></span>
                    <i class="gg-close cerrar"></i>
                </div>
                
                <ul class="list-menu">
                     
                        <li class="list-menu-item"><a href="#"  @click="$emit('componentName',AboutPage)">About</a></li>
                        <li class="list-menu-item"><a href="#" @click="$emit('componentName',PrivacyPage)">Privacy</a></li>
                        <li class="list-menu-item"><a href="#">Servicios</a></li>
                        <li class="list-menu-item"><a href="#">Portafolio</a></li>
                
                </ul>
            </div>

            <div class="darkLight-searchBox">

                <div class="dark-light">
                    <i class="gg-moon luna"></i>
                    <i class="gg-sun sol"></i>
                </div>
                <div class="searchBox">
                    <i class="gg-close cerrar"></i>
                    <i class="gg-search buscar"></i>
                </div>
                <div class="search-field">
                    <input type="text">
                    <i class="gg-search buscar"></i>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import '../styles/navbar.css';
import AboutPage from './AboutPage.vue';
import PrivacyPage from './PrivacyPage.vue';

</script>