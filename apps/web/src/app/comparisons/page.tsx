import FeatureUnavailable from '../../components/FeatureUnavailable';

export default function ComparisonsPage() {
  return (
    <FeatureUnavailable
      eyebrow="CROSS-DOCUMENT VERIFICATION"
      title="Comparisons"
      description="Compare extracted values across two business documents."
      detail="No comparison endpoint is currently available. This view will be enabled when the document service supports cross-document comparison."
    />
  );
}
