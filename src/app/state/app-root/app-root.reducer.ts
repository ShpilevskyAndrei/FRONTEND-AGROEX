import { createReducer, on } from '@ngrx/store';

import { UserPanelOptionId } from '../../shared/components/header/enums/user-panel-option-id';
import { AppRootActions } from './app-root.actions';
import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';

export interface AppRootState {
  selectedOptionId: UserPanelOptionId;
  mapLoadingStatus: LoadingStatus;
  map: GeoJSON.FeatureCollection<GeoJSON.MultiPolygon> | null;
}

export const APP_ROOT = 'appRoot';

const initialState: AppRootState = {
  selectedOptionId: UserPanelOptionId.MyAccount,
  mapLoadingStatus: DEFAULT_LOADING_STATUS,
  map: null,
};

export const APP_ROOT_REDUCER = createReducer(
  initialState,
  on(
    AppRootActions.getUserSelectTab,
    (state, { selectedOptionId }): AppRootState => ({
      ...state,
      selectedOptionId,
    })
  ),
  on(
    AppRootActions.getMapRequest,
    (state): AppRootState => ({
      ...state,
      mapLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    AppRootActions.getMapSuccess,
    (state, { map }): AppRootState => ({
      ...state,
      map,
      mapLoadingStatus: {
        loading: false,
        loaded: true,
        error: null,
      },
    })
  ),
  on(
    AppRootActions.getMapError,
    (state, { error }): AppRootState => ({
      ...state,
      mapLoadingStatus: { loading: false, loaded: false, error },
    })
  )
);
