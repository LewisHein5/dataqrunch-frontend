<script lang="ts">import "../app.css";
import {
    Button,
    Navbar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Sidebar,
    SidebarGroup,
    SidebarItem,
    SidebarWrapper
} from "flowbite-svelte";
import {
    ArrowLeftToBracketOutline,
    ArrowRightToBracketOutline,
    ChartPieSolid, EditOutline, FolderDuplicateSolid,
} from "flowbite-svelte-icons";
import {isAuthenticated, user} from "../store.js";
import type {Auth0Client, PopupLoginOptions} from "@auth0/auth0-spa-js";
import {onMount} from "svelte";
import auth from "../authService";
import type {Cookies} from "@sveltejs/kit";

let auth0Client: Auth0Client;

onMount(async ()=>{
    auth0Client = await auth.createClient();
    isAuthenticated.set(await auth0Client.isAuthenticated());
    let auth0User = await auth0Client.getUser();
    if (auth0User === undefined){
        isAuthenticated.set(false);
        return;
    }
    let token = await auth0Client.getTokenSilently();
    let r = new XMLHttpRequest();
    //TODO: get requests should not have side effects
    r.open("GET", "/login-success")
    r.setRequestHeader("jwt", token);
    r.send()
    user.set(auth0User);
});

function login() {
    auth.loginWithPopup(auth0Client, {})    
}

function logout() {
    auth.logout(auth0Client);
}
</script>

<div class="grid-layout">
    <div class="top-container">
        <Navbar>
            <NavBrand href="/">
                <img src="/src/images/logo.svg" class="me-3 h-6 sm:h-9" alt="DataQrunch Logo" />
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DataQrunch</span>
            </NavBrand>
            <NavHamburger/>
            <NavUl class="nav-list">
                <NavLi href="/">Home</NavLi>
                <NavLi href="/about">About</NavLi>
                {#if !$isAuthenticated}
                    <NavLi>
                        <Button on:click={login}>Log in</Button>
                    </NavLi>
                {:else}
                    <NavLi>
                        Hello, {$user.name}
                    </NavLi>
                    <NavLi>
                        <Button on:click={logout}>Log out</Button>
                    </NavLi>
                {/if}
            </NavUl>
        </Navbar>
    </div>
    
    <aside class="sidebar">
        <Sidebar>
            <SidebarWrapper style="width: 80%; overflow:hidden">
                <SidebarGroup>
                    <SidebarItem label="Dashboard">
                        <svelte:fragment slot="icon">
                            <ChartPieSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </svelte:fragment>
                    </SidebarItem>
                    {#if $isAuthenticated}
                        <SidebarItem label="Datasets" href="/groups">
                            <svelte:fragment slot="icon">
                                <FolderDuplicateSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                            </svelte:fragment>
                        </SidebarItem>
                    {/if}
                    {#if !$isAuthenticated}
                        <SidebarItem label="Sign In" on:click={login}>
                            <svelte:fragment slot="icon">
                                <ArrowRightToBracketOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                    {:else }
                        <SidebarItem label="Sign Out" on:click={login}>
                            <svelte:fragment slot="icon">
                                <ArrowLeftToBracketOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                    {/if}
                    <SidebarItem label="Sign Up">
                        <svelte:fragment slot="icon">
                            <EditOutline class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                        </svelte:fragment>
                    </SidebarItem>
                </SidebarGroup>
            </SidebarWrapper>
        </Sidebar>
    </aside>
    <main class="content">
        <slot></slot>
    </main>
</div>

<style>
    .grid-layout {
        display: grid;
        grid-template-columns: [sidebar-col] min(20vw, 200px) [main-col] auto ;
    }
    .top-container{
        grid-column: 1 / span 2;
        grid-row: 1;
    }

    .sidebar {
        overflow: clip;
        grid-column: 1 / span 1;
        grid-row: span;
    }

    .content {
        grid-column: span;
    }
    
</style>
