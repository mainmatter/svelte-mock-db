<script lang="ts">
	let { data } = $props();
</script>

<ul>
	{#each data.users as user (user.id)}
		<li>{user.name} - {user.name}</li>
	{/each}
</ul>
