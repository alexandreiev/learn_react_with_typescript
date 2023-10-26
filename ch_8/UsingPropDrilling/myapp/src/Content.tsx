type Props = {
  permissions: undefined | string[];
};

export function Content({ permissions }: Props) {
  if (permissions === undefined) {
    return null;
  }

  return permissions.includes("admin") ? (
    <p className="mt-4 text-1 text-center">
      Some important stuff that only an admin can do
    </p>
  ) : (
    <p className="mt-4 text-1 text-center">Insufficient permissions</p>
  );
}
