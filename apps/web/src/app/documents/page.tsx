import FeatureUnavailable from '../../components/FeatureUnavailable';

export default function DocumentsPage() {
  return (
    <FeatureUnavailable
      eyebrow="DOCUMENT LIBRARY"
      title="Documents"
      description="Browse and manage documents processed by your workspace."
      detail="The document service can return an individual document by ID, but it does not currently provide a list endpoint. Add document-list support to the API to enable browsing and filtering here."
    />
  );
}
