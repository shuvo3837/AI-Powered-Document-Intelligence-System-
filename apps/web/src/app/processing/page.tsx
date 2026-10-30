import FeatureUnavailable from '../../components/FeatureUnavailable';

export default function ProcessingPage() {
  return (
    <FeatureUnavailable
      eyebrow="JOB MONITORING"
      title="Processing"
      description="Track document jobs and review their current processing stage."
      detail="The API can report the status of a known job ID, but it does not provide a job list or processing-stage details. Upload a document to receive a job ID; centralized monitoring requires a job-list endpoint."
    />
  );
}
