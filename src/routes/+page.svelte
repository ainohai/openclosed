<script lang="ts">
	import P5 from 'p5-svelte';
	import LineControllers from './LineControllers.svelte';
	import { createSketch } from './sketch';
	import 'milligram/dist/milligram.min.css';
	
	const CANVAS_WIDTH = 350;
	const CANVAS_HEIGHT = 200;

	const NUM_OF_DRAWINGS = 1;

	let numOfAngles = 3;
	let stretch = 1;
	let stretchStartFromMid = 0.5;
	let radius = 30;

	type Sketchy = {
		id: number;
		sketch: (p5: any) => void;
	};

	let sketches: Sketchy[] = [];

	function settingsChange(settings: {numberOfAngles: number, stretch: number, stretchBeforeMid: number, radius: number}) {
		console.log(settings)
		numOfAngles = settings.numberOfAngles;
		stretch = settings.stretch;
		stretchStartFromMid = settings.stretchBeforeMid / 100;
		radius = settings.radius;
        createSketches()
	}

	function createSketches() {
		let newSketches = [];

		for (let i = 0; i < NUM_OF_DRAWINGS; i++) {
			newSketches.push({
				id: Date.now() + Math.random(),
				sketch: createSketch(CANVAS_WIDTH, CANVAS_HEIGHT, numOfAngles, stretch, stretchStartFromMid, radius)
			});
		}
		sketches = newSketches;
		return true;
	}

	createSketches()
</script>

<svelte:head>
	<title>Open & Closed polygons</title>
</svelte:head>

<div class="sketchWrap">
		{#each sketches as sketch (sketch.id)}
			<div class="sketch">
				<P5 sketch={sketch.sketch} />
			</div>
		{/each}
</div>

	<div style="margin-bottom:2rem">

		<LineControllers
			stretch={stretch}
			stretchBeforeMid={stretchStartFromMid * 100}
			numberOfAngles={numOfAngles}
			radius={radius}
			on:settingsChanged={(e) => settingsChange(e.detail.settings)}
		/>

	</div>


<style>
	:global(html){
		font-size: 10px;
	}
	:global(body){
		background-color: #f3f4f7;
		margin-right: 1.5rem;
	}
	.sketch {
		display: inline-block;
		margin: 24px 12px;
	}
	.sketchWrap {
		min-height: 250px;
	}
</style>
