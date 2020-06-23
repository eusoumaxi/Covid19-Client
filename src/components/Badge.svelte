<script>
  import moment from "moment";
  export let Summary;
  const {
    Country_Region,
    Last_Update,
    Confirmed,
    Deaths,
    Recovered,
    NewConfirmed,
    NewDeaths,
    NewRecovered
  } = Summary;

  let fromNow = moment(Last_Update).fromNow();

</script>

<div class="col-md-4">
  <div class="card stat-card">
    <div class="card-body">
      <h5 class="card-title">Casos Confirmado totales:</h5>
      <h2 class="float-right">
        <span>{Confirmed}</span>
      </h2>
      <p>
        Ultima Actualizacion,
        <br />
        {fromNow}
      </p>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div class="card stat-card">
    <div class="card-body">
      <h5 class="card-title">Casos recuperados totales:</h5>
      <h2 class="float-right">
        <span>{Recovered}</span>
      </h2>
      <p>
        Ultima Actualizacion,
        <br />
        {fromNow}
      </p>
    </div>
  </div>
</div>
<div class="col-md-4">
  <div class="card stat-card">
    <div class="card-body">
      <h5 class="card-title">Casos de muertes totales:</h5>
      <h2 class="float-right">
        <span>{Deaths}</span>
      </h2>
      <p>
        Ultima actulizacion,
        <br />
        {fromNow}
      </p>
    </div>
  </div>
</div>
