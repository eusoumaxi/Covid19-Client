<script>
  import Line from "svelte-chartjs/src/Line.svelte";
  export let datasTimeLine;
  export let country
  let datos = {
    labels: Object.values(datasTimeLine).map(item =>
      new Date(item.Date).toISOString().substring(0, 10)
    ),
    datasets: [
      {
        label: "Confirmed",
        borderColor: "#3333ff",
        fill: true,
        data: Object.values(datasTimeLine).map(item => item.Confirmed)
      },
      {
        label: "Recovered",
        borderColor: "Green",
        fill: true,
        data: Object.values(datasTimeLine).map(item => item.Recovered)
      },
      {
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true,
        data: Object.values(datasTimeLine).map(item => item.Deaths)
      }
    ]
  };
</script>

<style>
  .card {
    border: 0;
    box-shadow: 0 3px 10px rgba(62, 85, 120, 0.045);
    margin-bottom: 25px;
    border-radius: 4px;
    display: flow-root;
  }

</style>

<div class="row">
  <div class="col-lg">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          Grafica de tiempo de coronavirus en {country}
        </h5>
        <Line data={datos} />
      </div>
    </div>
  </div>
</div>
