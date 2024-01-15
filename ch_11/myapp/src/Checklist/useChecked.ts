import { useEffect, useState } from 'react';
import { IdValue } from './types';

type Params = {
  checkedIds?: IdValue[];
  onCheckedIdsChange?: (chekcedIds: IdValue[]) => void;
};

export function useChecked({ checkedIds, onCheckedIdsChange }: Params) {
  const [resolvedCheckedIds, setResolvedCheckedIds] = useState<IdValue[]>(checkedIds || []);

  useEffect(() => {
    const isControlled = checkedIds !== undefined;
    if (isControlled) {
      setResolvedCheckedIds(checkedIds);
    }
  }, [checkedIds]);

  const handleCheckChange = (checkedId: IdValue) => () => {
    const isChecked = resolvedCheckedIds.includes(checkedId);
    let newCheckedIds = isChecked
      ? resolvedCheckedIds.filter((itemCheckedId) => itemCheckedId !== checkedId)
      : resolvedCheckedIds.concat(checkedId);

    if (onCheckedIdsChange) {
      onCheckedIdsChange(newCheckedIds);
    } else {
      setResolvedCheckedIds(newCheckedIds);
    }
  };

  return { handleCheckChange, resolvedCheckedIds };
}
