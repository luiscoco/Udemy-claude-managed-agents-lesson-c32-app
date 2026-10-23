# C32 · Models and Effort

Validates choices against an explicitly illustrative local catalog. It does not assert current provider model availability. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.

## Concepts students will learn

- Model/effort compatibility is host policy
- Full model replacement
- Inspect the effective choice

## Configure and run

Use Node.js 24 or later. In PowerShell, from this repository's folder:

```powershell
node --version
npm ci
Copy-Item .env.example .env
notepad .env
```

No API key is required for the local experiment. Optional live commentary requires your own API key, agent ID and environment ID. It explains the local result; it does not activate the integration discussed in the lesson.

For the optional live path, set your API key, then run npm run setup if you do not already have resource IDs. The script creates the environment before a text-only agent, saves each ID immediately, and reuses IDs already configured. It uses CLAUDE_MODEL or the source default; choose a model available to your account. An uncertain network failure may have created a resource: inspect your account before retrying.

```powershell
npm start
```

Open `http://127.0.0.1:3032`. Navigation leads to `/guide.html#learning`, `/guide.html#run-guide`, `/architecture.html`, and the application lab. If you change `PORT`, use the configured port. Keep the terminal running; stop with Ctrl+C. `npm run dev` also starts the web application.

Select the first scenario, inspect its editable fields, press Run experiment, and compare the outcome and evidence with the table above. Select another scenario to investigate the boundary condition.

## Create your .env file

Copy `.env.example` to `.env` and enter your own values. Do not commit the real file. Restart the server after editing it. The example contains safe placeholders; optional settings may be left blank to use source defaults. Resource IDs and keys stay on the server.

```dotenv
ANTHROPIC_API_KEY=your_api_key
CLAUDE_MANAGED_AGENT_ID=your_agent_id
CLAUDE_MANAGED_ENVIRONMENT_ID=your_environment_id
PORT=3032
```

## How the app was build

### 1. Declare the illustrative compatibility catalog

The local fast profile permits low and medium effort; deep permits medium, high and max. These are teaching profiles, not a lookup of current provider model availability.

Source: [src/lesson.ts](src/lesson.ts#L13)

```typescript
const catalog: Record<string, string[]> = {
  fast: ["low", "medium"],
  deep: ["medium", "high", "max"],
};
```

### 2. Check the selected profile and effort

The typed input helpers read both values. Optional chaining rejects an unknown profile or unsupported effort without assuming every model accepts every setting.

Source: [src/lesson.ts](src/lesson.ts#L14)

```typescript
const profile = text(input, "profile"),
  effort = text(input, "effort"),
  compatible = !!catalog[profile]?.includes(effort);
```

### 3. Inspect selection and replacement semantics

The result preserves the selected values and labels complete-model-object replacement. That field explains the intended update policy; this reducer does not replace a remote model configuration.

Source: [src/lesson.ts](src/lesson.ts#L15)

```typescript
return report(
  compatible ? "passed" : "rejected",
  compatible
    ? "Choice matches the illustrative reviewed catalog"
    : "Model profile and effort are incompatible",
  {
    compatible,
    catalogSource: "local illustrative profiles, not provider model IDs",
    selection: { profile, effort },
    replacementSemantics: "complete model object",
  },
  [
    "Check a reviewed compatibility catalog",
    "Replace rather than merge model configuration",
    "Verify the actual provider response in a live integration",
  ],
);
```

### Check your understanding

Run **Select a reviewed model profile** in the application. Compare the result with these scenario expectations:

```json
{
  "input": {
    "profile": "fast",
    "effort": "medium"
  },
  "expectedOutcome": "passed",
  "checkEvidence": {
    "compatible": true
  }
}
```

Then try **Reject an unsupported effort**. Its expected outcome is `rejected`; identify the condition or evidence field that explains the difference.

## Validation

```powershell
npm test
python scripts/verify-walkthrough.py
```

The source hash check detects when walkthrough excerpts need refreshing. Browser verification covers page navigation, readable text, mobile layout, dark mode, diagram and image routes. Local scenarios and live provider calls are recorded separately in the workspace verification report; local success is not evidence of a live provider operation.

## Repository contents

Application sources, student web pages, safe configuration example and documentation images are included. `node_modules`, `presentation`, `output`, `reviewed`, `v3`, `teaching-material`, build output, local journals, credentials and local resource files are ignored. Existing teaching videos and presentations remain in the original workspace.
