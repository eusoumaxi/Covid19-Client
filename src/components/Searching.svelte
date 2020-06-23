<script>
  import gql from "graphql-tag";
  import { searching } from "../store.js";
  import { createApolloClient } from "../routes/_client";
  import { onMount } from "svelte";
  let country = [];
  onMount(async () => {
    const client = createApolloClient();
    country = await client
      .query({
        query: gql`
          {
            summary {
              countries {
                Country_Region
                Slug
                Confirmed
                Recovered
                Deaths
                Last_Update
                NewConfirmed
                NewDeaths
                NewRecovered
              }
            }
          }
        `
      })
      .then(results => results.data.summary)
      .then(results => results.countries)
      .catch(errr => console.log(errr));
    return { country };
  });

  const searchingClick = async () => {
    searching.update(() => "");
  };
</script>

<!-- .filter(i => i.Country_Region === 'U') -->

<h3>Resultado de Busqueda: {$searching}</h3>
{#each country.filter(i =>
  i.Country_Region.toLowerCase().includes($searching.toLowerCase())
) as Summary}
  <div class="col-xl">
    <div class="card">
      <div class="card-body">
        <p>
          <span class="card-title">{Summary.Country_Region},</span>
          {Summary.Confirmed === 0 ? 'no ha reportado ninguna cifra.' : Summary.NewConfirmed === 0 ? ` no  ha reportado
                cifras nuevas y aun continua con ${Summary.Confirmed} casos confirmados.` : `reporto que la cifra
                  de contagios ascendió a ${Summary.Confirmed} con ${Summary.NewConfirmed}  casos nuevos confirmados. ${Summary.Deaths === 0 ? `${Summary.Confirmed === 0 ? '' : `Ademas se ha recuperados ${Summary.Recovered} `} ` : `  Además, informó que las víctimas mortales ${Summary.NewDeaths === 0 ? 'sigue siendo' : 'son'}  ${Summary.Deaths}  ${Summary.NewDeaths === 0 ? '' : `(+ ${Summary.NewDeaths} nuevos casos mortal)`} ${Summary.Recovered === 0 ? '' : `${Summary.NewRecovered === 0 ? `y todavia siguen los ${Summary.Recovered} recuperados.` : `y que ya se ha recuperado ${Summary.NewRecovered} casos, sumando a los ${Summary.Recovered}  casos recuperados`} `} `}
                 `}
        </p>

        <a href="/country/{Summary.Slug}" on:click={searchingClick}>
          <button
            type="button"
            class="btn btn-primary btn-xs"
            on:click={searchingClick}>
            Ver mas detalles de {Summary.Country_Region}
          </button>
        </a>

      </div>
    </div>
  </div>
{/each}
