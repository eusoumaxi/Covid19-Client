<script>
export let datos
  const {
    Country_Region,
    Confirmed,
    Slug,
    Deaths,
    Recovered,
    NewConfirmed,
    NewDeaths,
    NewRecovered
  } = datos;
</script>

<div class="col-xl">
  <div class="card">
    <div class="card-body">

      <h5 class="card-title">Ultima Hora</h5>

      <p>
        <span class="card-title">{Country_Region},</span>
        {Confirmed === 0 ? 'no ha reportado ninguna cifra.' : NewConfirmed === 0 ? ` no  ha reportado
                cifras nuevas y aun continua con ${Confirmed} casos confirmados.` : `reporto que la cifra
                  de contagios ascendió a ${Confirmed} con ${NewConfirmed}  casos nuevos confirmados. ${Deaths === 0 ? `${Confirmed === 0 ? '' : `Ademas se ha recuperados ${Recovered} `} ` : `  Además, informó que las víctimas mortales ${NewDeaths === 0 ? 'sigue siendo' : 'son'}  ${Deaths}  ${NewDeaths === 0 ? '' : `(+ ${NewDeaths} nuevos casos mortal)`} ${Recovered === 0 ? '' : `${NewRecovered === 0 ? `y todavia siguen los ${Recovered} recuperados.` : `y que ya se ha recuperado ${NewRecovered} casos, sumando a los ${Recovered}  casos recuperados`} `} `}
                 `}
      </p>
    </div>
  </div>
</div>
