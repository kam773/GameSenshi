import { simplerResponseHandling } from 'utils'
import { auth, handleDifferentCredential } from 'firebaseInit'
import { docUserSettingGeneralSetOnSignUpWithEmail } from 'fireStored'
import {
	FUNCTION_EMAIL,
	FUNCTION_PASSWORD,
	FIRESTORE_USER_SETTINGS_GENERAL_DISPLAY_NAME,
	UNEXPECTED_ERROR_CODE_5,
	UNEXPECTED_ERROR_CODE_7,
} from 'constantValues'

const handleSignUpWithEmailAndPassword = async (
	values,
	onSuccessfulSignUp = () => {}
) => {
	const {
		[FUNCTION_EMAIL]: email,
		[FUNCTION_PASSWORD]: password,
		[FIRESTORE_USER_SETTINGS_GENERAL_DISPLAY_NAME]: displayName,
	} = values
	let credential = null
	try {
		credential = await auth().createUserWithEmailAndPassword(email, password)
	} catch (err) {
		const { code } = err
		if (code && code.includes('auth/email-already-in-use')) {
			handleDifferentCredential(
				email,
				auth.EmailAuthProvider.credential(email, password)
			)
			return simplerResponseHandling(false, '', err)
		} else {
			return simplerResponseHandling(false, UNEXPECTED_ERROR_CODE_5, err)
		}
	}
	const { user } = credential
	onSuccessfulSignUp()
	user.sendEmailVerification().catch(() => {
		//this is not important, doesnt matter if it failed
	})

	try {
		await docUserSettingGeneralSetOnSignUpWithEmail(displayName)
	} catch (err) {
		return simplerResponseHandling(false, UNEXPECTED_ERROR_CODE_7, err)
	}

	user.updateProfile({ displayName }).catch(() => {
		//this is not important, doesnt matter if it failed
	})
	return simplerResponseHandling(true)
}

export {
	handleSignUpWithEmailAndPassword,
	FUNCTION_EMAIL,
	FUNCTION_PASSWORD,
	FIRESTORE_USER_SETTINGS_GENERAL_DISPLAY_NAME,
}
