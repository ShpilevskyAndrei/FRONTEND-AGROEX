import { createReducer, on } from '@ngrx/store';

import { UserFromApi } from '../../pages/registration-page/interfaces/user-api-response.interface';
import { DEFAULT_LOADING_STATUS } from '../../shared/constants/lodaing-default-status';
import { LoadingStatus } from '../../shared/interfaces/loading-status';
import { RegistrationPageActions } from './registration-page.actions';

export interface RegistrationPageState {
  registrationLoadingStatus: LoadingStatus;
  user: UserFromApi | null;
}

export const REGISTRATION_PAGE = 'registrationPage';

const initialState: RegistrationPageState = {
  registrationLoadingStatus: DEFAULT_LOADING_STATUS,
  user: null,
};

export const REGISTRATION_PAGE_REDUCER = createReducer(
  initialState,
  on(
    RegistrationPageActions.getUserRequest,
    (state): RegistrationPageState => ({
      ...state,
      registrationLoadingStatus: DEFAULT_LOADING_STATUS,
    })
  ),
  on(
    RegistrationPageActions.getUserSuccess,
    (state, { user }): RegistrationPageState => ({
      ...state,
      user,
      registrationLoadingStatus: { loading: false, loaded: true, error: null },
    })
  ),
  on(
    RegistrationPageActions.getUserError,
    (state, { error }): RegistrationPageState => ({
      ...state,
      registrationLoadingStatus: { loading: false, loaded: false, error },
    })
  )
);
