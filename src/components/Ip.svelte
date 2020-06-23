<script>
  export let data;
</script>

<style>
  .ip {
    border: 1px solid rgba(219, 219, 219, 1);
    border-radius: 4px;
    background-color: white;
    margin: 0 0 2em 0;
    width: 300px;
    height: 135px;
    position: absolute;
    top: 300px;
    left: 30%;
    z-index: 9;
    padding: 1em;
  }
  .ip-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ip-head h2 {
    font-size: 16px;
  }
</style>

<div class="ip">
  <div class="ip-head">
    <h2>{data.country}</h2>
  </div>
  <div class="ip-content">
    <h6>Quieres ver los casos mas recientes de {data.country}?</h6>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary btn-xs" on:click>CERRAR</button>
    <a href="/country/{data.code}">
      <button type="button" rel="prefetch" class="btn btn-primary btn-xs"  on:click>
        VER CASOS
      </button>
    </a>
  </div>
</div>
