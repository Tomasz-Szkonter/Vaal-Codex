import { useCallback, useEffect, useState } from 'react';

const STORAGE_PREFIX = 'poe2-leveling:progress:';

const storageKey = (buildId) => `${STORAGE_PREFIX}${buildId}`;

function readInitial(buildId) {
  try {
    const raw = localStorage.getItem(storageKey(buildId));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function write(buildId, state) {
  try {
    localStorage.setItem(storageKey(buildId), JSON.stringify(state));
  } catch {
    // Quota or disabled storage; intentionally silent.
  }
}

export function useProgress(buildId) {
  const [state, setState] = useState(() => readInitial(buildId));

  // If buildId changes (navigating between builds), reload from storage.
  useEffect(() => {
    setState(readInitial(buildId));
  }, [buildId]);

  // Toggle is alias-aware: if any alias key is set, the item shows as checked,
  // so unchecking must clear the primary id AND every alias. Checking only ever
  // writes the primary id, so legacy keys decay out as users tick things off.
  const toggle = useCallback(
    (itemId, aliases = []) => {
      setState((prev) => {
        const wasChecked =
          !!prev[itemId] || aliases.some((a) => prev[a]);
        const next = { ...prev };
        if (wasChecked) {
          delete next[itemId];
          for (const a of aliases) delete next[a];
        } else {
          next[itemId] = true;
        }
        write(buildId, next);
        return next;
      });
    },
    [buildId]
  );

  const set = useCallback(
    (itemId, value) => {
      setState((prev) => {
        const next = { ...prev };
        if (value) next[itemId] = true;
        else delete next[itemId];
        write(buildId, next);
        return next;
      });
    },
    [buildId]
  );

  const reset = useCallback(() => {
    write(buildId, {});
    setState({});
  }, [buildId]);

  const importState = useCallback(
    (incoming) => {
      const clean = {};
      if (incoming && typeof incoming === 'object') {
        for (const [k, v] of Object.entries(incoming)) {
          if (v === true) clean[k] = true;
        }
      }
      write(buildId, clean);
      setState(clean);
    },
    [buildId]
  );

  return { state, toggle, set, reset, importState };
}

// Standalone read for the Home grid — returns the raw progress object so the
// caller can run alias-aware counting via helpers.isItemChecked. Avoids
// subscribing to React state for the grid (the cards never need to re-render
// based on individual toggles).
export function readProgress(buildId) {
  try {
    const raw = localStorage.getItem(storageKey(buildId));
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}
