<script lang="ts">

	import Slider from './Slider.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let stretch: number;
	export let stretchBeforeMid: number;
    export let numberOfAngles: number;
    export let radius: number;

	function settingsChange(
        numberOfAngles: number, 
        stretch: number, 
        stretchBeforeMid: number,
        radius: number
	) {

		dispatch('settingsChanged', {
			settings: {numberOfAngles: numberOfAngles, stretch: stretch, stretchBeforeMid: stretchBeforeMid, radius}
		});
		return true;
	}

	$: clear = settingsChange(numberOfAngles, stretch, stretchBeforeMid, radius);
</script>


<div class="slider">

    <div class="small">
        <h3> Kulmien määrä</h3>
        <input type="number" bind:value={numberOfAngles} min=1 />
    </div>
        

    <div class="slider">
    <h3>Venytyskerroin</h3>
    <Slider bind:value={stretch} scaleBottom={0.01} scaleTop={10}/>
    </div>

    <h3>% venytyksestä viivan alkupuolella:</h3>
    <Slider bind:value={stretchBeforeMid} />


    <h3>Koko:</h3>
    <Slider bind:value={radius} />
</div>


<style>
    .slider {
        width: 100%;
        margin-bottom: 1.2rem;
    }
    .small {
        width:40%;
        display: inline-block;
    }

</style>