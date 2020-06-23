<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { searching } from "../store.js";
  let isOpenSearch = false;
  let query;
  let searchInput;
  function search() {
    history.pushState({}, null, "/country?q=" + query);
    searching.update(() => query);
  }
  const navigateHome = async () => {
    await goto("/");
    searching.update(() => "");
  };
</script>

<style>
  .covid-header {
    padding: 30px;
    width: 100%;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    z-index: 9;
    display: block;
  }
  .covid-header .navbar {
    padding: 8px 13px;
  }

  .covid-header .navbar-brand {
    color: #037afb;
    font-size: 22px;
    font-weight: 700;
    margin-right: 25px;
  }

  .navbar-toggler {
    padding: 0;
    line-height: 32px;
    font-size: 24px;
    border: none;
    color: #7d7d83;
    outline: 0 !important;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .navbar-toggler:hover {
    color: #000;
  }

  .covid-header .search {
    width: 40%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .covid-header .search input {
    border: none;
    padding: 15px 15px 15px 50px;
    height: 50px;
    width: 100%;
    font-size: 13px;
    background: rgba(255, 255, 255, 0.95);
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    opacity: 0.95;
    color: #838d91;
    border-radius: 4px;
  }

  .covid-header .search:hover input,
  .covid-header .search input:focus,
  .covid-header .search input:active {
    opacity: 1;
    outline: 0 none !important;
    box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045);
    background: white;
  }

  .covid-header .search input::-webkit-input-placeholder {
    color: rgba(131, 141, 145, 0.6);
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .covid-header .search:before {
    display: block;
    content: "search";
    font-family: "Material Icons";
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    position: absolute;
    z-index: 99;
    color: rgba(131, 141, 145, 0.6);
  }

  .covid-header {
    color: #838d91;
    padding: 8px 16px;
    display: block;
    margin: 0;
    font-size: 13px;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
  }

  .covid-header {
    background: #f4f7fc;
    color: #037afb;
  }

  .menuCountry {
    width: 30px;
    height: 30px;
    float: left;
  }

  @media (max-width: 991px) {
    .navbar-collapse {
      height: 0px !important;
      opacity: 0;
      -webkit-transition: all 0.2s ease-in-out;
      -moz-transition: all 0.2s ease-in-out;
      -o-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      margin-top: 0px;
    }
    .navbar-collapse.show {
      height: 50px !important;
      opacity: 1;
      margin-top: 20px;
    }

    .covid-header .search {
      width: calc(100%);
      left: 0;
      transform: translateX(0);
      margin: 0 !important;
    }
  }
</style>

<div class="covid-header">
  <nav class="navbar navbar-expand-lg">
    <p class="navbar-brand" rel="prefetch" on:click={navigateHome}>
      <img
        class="menuCountry"
        src="https://cdn.countryflags.com/thumbs/colombia/flag-button-square-250.png"
        alt="co" />
      COVID-19
    </p>
    <button
      class="navbar-toggler"
      type="button"
      on:click={() => (isOpenSearch = !isOpenSearch)}>
      <i class="material-icons">keyboard_arrow_down</i>
    </button>
    <div
      class={isOpenSearch ? 'navbar-collapse collapse show ' : 'collapse navbar-collapse'}>
      <form
        class="form-inline my-2 my-lg-0 search"
        novalidate
        autocomplete="off"
        on:submit|preventDefault={search}>
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Buscar por paises"
          aria-label="Search"
          bind:value={query}
          on:input={() => search(query)}
          name="search" />
      </form>
    </div>
  </nav>
</div>
