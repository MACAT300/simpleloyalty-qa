// Tab switching function
function sw(btn, id) {
	document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
	document.querySelectorAll(".panel").forEach((p) =>
		p.classList.remove("active"),
	);
	btn.classList.add("active");
	document.getElementById(id).classList.add("active");
}

// Test case data
const testCases = [
	{
		id: "TC-01",
		name: "Load brand list successfully",
		from: "Idle",
		to: "Brand List Loaded",
		input: "Brands exist in DB; network OK",
		expected: "Brand dropdown populated with all brands",
		type: "Happy",
	},
	{
		id: "TC-02",
		name: "No brands in system",
		from: "Idle",
		to: "Error: No Brands",
		input: "Zero brands in DB",
		expected: '"No brands available. Contact admin." Process ends.',
		type: "Error",
	},
	{
		id: "TC-03",
		name: "Brand list API failure",
		from: "Idle",
		to: "Error: Load Failed",
		input: "DB / network unreachable on brand list call",
		expected: '"Failed to load brands. Check connection and retry." Process ends.',
		type: "Error",
	},
	{
		id: "TC-04",
		name: "Select brand with outlets",
		from: "Brand List Loaded",
		to: "Outlets Loaded",
		input: "Finance exec selects a brand that has outlets",
		expected: "All outlets under the brand shown with top-up amount fields",
		type: "Happy",
	},
	{
		id: "TC-05",
		name: "Select brand with no outlets",
		from: "Brand List Loaded",
		to: "Error: No Outlets",
		input: "Finance exec selects a brand with 0 outlets",
		expected: '"No outlets found for this brand." User returned to brand selection.',
		type: "Error",
	},
	{
		id: "TC-06",
		name: "Submit with empty top-up field",
		from: "Form Ready",
		to: "Validation Error",
		input: 'One or more outlet fields left blank; click "Next"',
		expected: '"Top-up amount is required." Blank field(s) highlighted. Form stays open.',
		type: "Error",
	},
	{
		id: "TC-07",
		name: "Submit zero top-up amount",
		from: "Form Ready",
		to: "Validation Error",
		input: '"0" entered in top-up field; click "Next"',
		expected: '"Amount must be greater than 0." Field highlighted. Form stays open.',
		type: "Error",
	},
	{
		id: "TC-08",
		name: "Submit negative top-up amount",
		from: "Form Ready",
		to: "Validation Error",
		input: '"-100" entered in top-up field; click "Next"',
		expected: '"Amount must be a positive number." Field highlighted. Form stays open.',
		type: "Error",
	},
	{
		id: "TC-09",
		name: "Submit non-numeric top-up",
		from: "Form Ready",
		to: "Validation Error",
		input: '"abc" entered in top-up field; click "Next"',
		expected: '"Please enter a valid numeric amount." Field highlighted. Form stays open.',
		type: "Error",
	},
	{
		id: "TC-10",
		name: "Submit all valid top-up amounts",
		from: "Form Ready",
		to: "Inputs Validated",
		input: "All fields filled with positive integers (e.g. 500, 200)",
		expected: "System proceeds to generate QuickBooks quotation",
		type: "Happy",
	},
	{
		id: "TC-11",
		name: "QuickBooks quotation generated",
		from: "Inputs Validated",
		to: "Quotation Generated",
		input: "QB API reachable; valid client email in DB",
		expected: "Quotation created in QuickBooks; email with quotation sent to client",
		type: "Happy",
	},
	{
		id: "TC-12",
		name: "QuickBooks API unavailable",
		from: "Inputs Validated",
		to: "Error: QB Failed",
		input: "QB service is down or returns error",
		expected: '"Failed to generate quotation. Please try again." No SMS credits given. Retry shown.',
		type: "Error",
	},
	{
		id: "TC-13",
		name: "Retry QB — succeeds",
		from: "Error: QB Failed",
		to: "Quotation Generated",
		input: "Finance exec clicks Retry; QB API now reachable",
		expected: "Quotation created on retry; process continues to credit step",
		type: "Retry",
	},
	{
		id: "TC-14",
		name: "SMS credits added successfully",
		from: "Quotation Generated",
		to: "Credits Added",
		input: "Quotation exists; system credits SMS to client account",
		expected: "Client account balance updated; each company credited separately, not as one brand total",
		type: "Happy",
	},
	{
		id: "TC-15",
		name: "SMS credit addition fails",
		from: "Quotation Generated",
		to: "Error: Credit Failed",
		input: "Internal error during credit step (e.g. DB write fails)",
		expected: '"Failed to credit SMS. Admin notified." Incident logged. Retry offered. No double-credit on retry.',
		type: "Error",
	},
	{
		id: "TC-16",
		name: "Retry credit — succeeds",
		from: "Error: Credit Failed",
		to: "Credits Added",
		input: "Finance exec clicks Retry; credit system now available",
		expected: "SMS credits added successfully; process proceeds to success confirmation",
		type: "Retry",
	},
	{
		id: "TC-17",
		name: "Success confirmation shown",
		from: "Credits Added",
		to: "Process Complete",
		input: "All prior steps completed without error",
		expected: '"Credits successfully added." Updated SMS balance visible in client account.',
		type: "Happy",
	},
	{
		id: "TC-18",
		name: "Brand with multiple outlets, different companies",
		from: "Form Ready",
		to: "Credits Added",
		input: "Brand has 3 outlets under 3 different companies; amounts 200 / 500 / 100",
		expected: "Each company's account credited with its own amount independently — not pooled or combined",
		type: "Happy",
	},
];

function getBadgeClass(type) {
	if (type === "Happy") return "bh";
	if (type === "Error") return "be";
	if (type === "Retry") return "br";
	return "";
}

function renderTestCases() {
	const tbody = document.querySelector("#tcTable tbody");
	tbody.innerHTML = testCases
		.map(
			(tc) => `
      <tr>
        <td class="tid">${tc.id}</td>
        <td>${tc.name}</td>
        <td>${tc.from}</td>
        <td>${tc.to}</td>
        <td>${tc.input}</td>
        <td>${tc.expected}</td>
        <td><span class="badge ${getBadgeClass(tc.type)}">${tc.type}</span></td>
      </tr>
    `,
		)
		.join("");
}

renderTestCases();
