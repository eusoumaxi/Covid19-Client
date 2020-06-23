<script context="module">
  import gql from "graphql-tag";
  import { createApolloClient } from "./_client";
  export async function preload(page, session) {
    const client = createApolloClient();
    let country = await client
      .query({
        query: gql`
          {
            country(country: "${session.code}") {
              Summary {
                Country_Region
                Slug
                Last_Update
                Confirmed
                Deaths
                Recovered
                NewConfirmed
                NewDeaths
                NewRecovered
              }
            }
            timelineCountry(country: "${session.code}") {
              Confirmed
              Deaths
              Recovered
              Date
            }
          }
        `
      })
      .then(results => results.data)
      .catch(() => this.error(404, "Not found"));
    return { country };
  }
</script>

<script>
  import { stores } from "@sapper/app";
  import { isModals, searching } from "../store.js";

  import { blur } from "svelte/transition";
  import { onMount } from "svelte";
  import Badge from "../components/Badge.svelte";
  import MessageNew from "../components/MessageNew.svelte";
  import TimeLine from "../components/TimeLine.svelte";
  import Modal from "../components/Modal.svelte";
  import Ip from "../components/Ip.svelte";
  import Searching from "../components/Searching.svelte";
  export let country;
  const { preloading, session } = stores();
  const {
    country: { Summary },
    timelineCountry
  } = country;

  let dataCountry = {};
  let loader = true;
  $session.view === undefined
    ? onMount(async () => {
        const response = await fetch("https://ipapi.co/json")
          .then(res => res.json())
          .then(res => {
            dataCountry = { country: res.country_name, code: res.country_code };
            document.cookie = `country=${res.country_name}`;
            document.cookie = `code=${res.country_code}`;
            document.cookie = `view=true`;
            loader = false;
          });
      })
    : [];

  function handleClick() {
    document.cookie = `view=false`;
    isModals.update(() => false);
  }
</script>

<svelte:head>
  <title>{Summary.Country_Region}</title>
</svelte:head>

{#if $isModals && loader === false && $session.view === undefined}
  <div transition:blur>
    <Modal>
      <Ip data={dataCountry} on:click={handleClick} />
    </Modal>
  </div>
{/if}
{#if $searching === ''}
  <h1>{Summary.Country_Region}</h1>
  <div class="row">
    <Badge {Summary} />
    <MessageNew datos={Summary} title={false} />
  </div>
  <TimeLine datasTimeLine={timelineCountry} country={Summary.Country_Region} />
{:else}
  <Searching />
{/if}
