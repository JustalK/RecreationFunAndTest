<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Insert title here</title>
	<link rel="stylesheet" href="./assets/css/index.css">
	<script src="./assets/js/index2.js"></script>
</head>
<body>
	<h1>Simple test with the parallel JS</h1>
	<button id="BWORKER" type="button">With Worker</button>
	<button id="BWITHOUTWORKER" type="button">Without Worker</button>
	<table id="TTABLE">
		   <tr>
				<th>ID</th>
				<th>A data test</th>
		   </tr>
		<?php for($i=1000;$i--;) { 
			$tmp = rand();
		?>
			<tr data-id="<?= $tmp; ?>">
				<td><?= $tmp; ?></td>
				<td>Test <?= $tmp; ?></td>
			</tr>
		<?php } ?>
	</table>
</body>
</html>