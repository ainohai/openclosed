<script lang="ts">
    import RangeSlider from 'svelte-range-slider-pips'

    export let value = 10;
    export let scaleBottom = 0;
    export let scaleTop = 100;

    let values = [value];

    const onChange = (e:  CustomEvent<RangeSlider.OnChange>) => {
        values = [e.detail.values[0]]; 
        
    }
    const onStop = (e:  CustomEvent<RangeSlider.OnStop>) => {
        value = e.detail.values[0]; 
    }


  </script>
  


  <RangeSlider pips step={0.1} min={scaleBottom} max={scaleTop} first=label last=label bind:values on:change={(e) => {onChange(e)}} on:stop={(e)=>{onStop(e)}}/>
  <input disabled type="number" bind:value={values[0]} />  