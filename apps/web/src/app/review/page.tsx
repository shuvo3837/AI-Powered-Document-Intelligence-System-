import FeatureUnavailable from '../../components/FeatureUnavailable';

export default function ReviewPage() {
  return (
    <FeatureUnavailable
      eyebrow="VALIDATION WORKSPACE"
      title="Review queue"
      description="Inspect validation issues and correct extracted document values."
      detail="The current API does not expose a review queue or validation issue list. Review items will appear here when those endpoints are available."
    />
  );
}
