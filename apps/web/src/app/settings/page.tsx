import FeatureUnavailable from '../../components/FeatureUnavailable';

export default function SettingsPage() {
  return (
    <FeatureUnavailable
      eyebrow="WORKSPACE PREFERENCES"
      title="Settings"
      description="Manage workspace preferences and service connections."
      detail="Workspace settings are not currently exposed by the application API."
    />
  );
}
