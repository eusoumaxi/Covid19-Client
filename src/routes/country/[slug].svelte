<script context="module">
  import gql from "graphql-tag";
  import { createApolloClient } from "../_client";
  export async function preload(page) {
    const { slug } = page.params;
    const client = createApolloClient();
    let country = await client
      .query({
        query: gql`
          {
            country(country: "${slug}") {
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
            timelineCountry(country: "${slug}") {
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
  import Badge from "../../components/Badge.svelte";
  import MessageNew from "../../components/MessageNew.svelte";
  import TimeLine from "../../components/TimeLine.svelte";
  import Searching from "../../components/Searching.svelte";
  import { searching } from "../../store.js";
  export let country;
  const {
    country: { Summary },
    timelineCountry
  } = country;

  const { preloading } = stores();
</script>

<svelte:head>
  <title>{Summary.Country_Region}</title>
</svelte:head>
{#if $searching === ''}
  <h1>{Summary.Country_Region}</h1>
  <div class="row">
    <Badge {Summary} />
    <MessageNew datos={Summary} />
  </div>
  <TimeLine datasTimeLine={timelineCountry} country={Summary.Country_Region} />
{:else}
  <Searching />
{/if}
