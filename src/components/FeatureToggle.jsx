import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// FeatureToggle component computes which features are enabled
// for the current user based on configuration rules. It supports
// boolean, percentage, and user-targeted feature toggles.
const FeatureToggle = ({ config, currentUser, children }) => {
  // useMemo to avoid recalculating features on every render
  const features = useMemo(() => {
    const result = {};
    Object.entries(config).forEach(([key, rule]) => {
      switch (rule.type) {
        case 'boolean':
          result[key] = !!rule.enabled;
          break;
        case 'percentage': {
          // Persist a random value per feature to localStorage so that
          // the same user gets consistent rollout percentage.
          const storageKey = `feature_rand_${key}`;
          let stored = localStorage.getItem(storageKey);
          if (stored === null) {
            stored = Math.random() * 100;
            localStorage.setItem(storageKey, stored);
          } else {
            stored = parseFloat(stored);
          }
          result[key] = stored < rule.percentage;
          break;
        }
        case 'user':
          result[key] = Array.isArray(rule.users) && rule.users.includes(currentUser);
          break;
        default:
          result[key] = false;
      }
    });
    return result;
  }, [config, currentUser]);

  // Render children as a function, passing computed feature flags
  return children({ features });
};

FeatureToggle.propTypes = {
  config: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
  children: PropTypes.func.isRequired,
};

FeatureToggle.defaultProps = {
  currentUser: '',
};

export default FeatureToggle;
