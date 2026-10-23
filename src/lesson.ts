import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 32,
  title: "Models and Effort",
  description: "Model choice and effort influence quality, latency, and consumption, but their effect must be measured on the task. In managed sessions they are configuration choices, not an invitation to reuse request fields from another A P I.",
  concepts: ["Model/effort compatibility is host policy", "Full model replacement", "Inspect the effective choice"],
  scope: "Validates choices against an explicitly illustrative local catalog. It does not assert current provider model availability. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Select a reviewed model profile", "input": {"profile": "fast", "effort": "medium"}, "expected": "passed", "checks": {"compatible": true}}, {"id": "1", "label": "Reject an unsupported effort", "input": {"profile": "fast", "effort": "max"}, "expected": "rejected", "checks": {"compatible": false}}],
  async run(input) {

const catalog:Record<string,string[]>={fast:["low","medium"],deep:["medium","high","max"]};
const profile=text(input,"profile"),effort=text(input,"effort"),compatible=!!catalog[profile]?.includes(effort);
return report(compatible?"passed":"rejected",compatible?"Choice matches the illustrative reviewed catalog":"Model profile and effort are incompatible",{compatible,catalogSource:"local illustrative profiles, not provider model IDs",selection:{profile,effort},replacementSemantics:"complete model object"},["Check a reviewed compatibility catalog","Replace rather than merge model configuration","Verify the actual provider response in a live integration"]);

  }
};
