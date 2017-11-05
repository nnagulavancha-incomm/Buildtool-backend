/*
 * @Author: Naresh Kumar Nagulavancha 
 * @Date: 2017-11-04 00:30:29 
 * @Last Modified by: Naresh Kumar Nagulavancha
 * @Last Modified time: 2017-11-04 23:29:56
 */


const functions = require('firebase-functions');
const admin = require('firebase-admin');

const prodCertStr = 'MIIEcTCCA1mgAwIBAgIJAKDLrlwQzhOKMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJVUzELMAkGA1UECBMCR0ExEDAOBgNVBAcTB0F0bGFudGExDzANBgNVBAoTBkluQ29tbTEQMA4GA1UECxMHSW5mb1NlYzENMAsGA1UEAxMESU1TUzEhMB8GCSqGSIb3DQEJARYSbm9jbWFpbEBpbmNvbW0uY29tMB4XDTE0MDExNTE2MDcxMVoXDTI0MDExMzE2MDcxMVowgYExCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJHQTEQMA4GA1UEBxMHQXRsYW50YTEPMA0GA1UEChMGSW5Db21tMRAwDgYDVQQLEwdJbmZvU2VjMQ0wCwYDVQQDEwRJTVNTMSEwHwYJKoZIhvcNAQkBFhJub2NtYWlsQGluY29tbS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCmWcg2dIP3K8HDIfMGHJHauweLwGELPREvbtt75vfjwtX9rmSRNSnQwG7WQ+bFaOl57uoww5MdhAFZ0RdkLPHs0ZEoL6Fy+oZILvUQMz2H73Zsth3NGIGkMUCA/xA9Tf3LmMJDkHrbaM39KlS4Ge6UcwraX6BQGdkAt391yJf77tXotMIzwFTGD1rnLhcRA0k+EYbhk7KRZlW3yrmrqn8qELzj1LH/mXOpY7SIvhP9P0/HipW227GGQRuRHZjbDUFwdUXGti8xMhXUBolPSsEX3ezKuXDxBNUhX3XWm7sj2VUwXyAxRbpXi2L9oHJ1jZ48Cy7W1OQszzdTqSkcShElAgMBAAGjgekwgeYwHQYDVR0OBBYEFGHWeIkkqhdVV4qmaJIUMOgD6IhoMIG2BgNVHSMEga4wgauAFGHWeIkkqhdVV4qmaJIUMOgD6IhooYGHpIGEMIGBMQswCQYDVQQGEwJVUzELMAkGA1UECBMCR0ExEDAOBgNVBAcTB0F0bGFudGExDzANBgNVBAoTBkluQ29tbTEQMA4GA1UECxMHSW5mb1NlYzENMAsGA1UEAxMESU1TUzEhMB8GCSqGSIb3DQEJARYSbm9jbWFpbEBpbmNvbW0uY29tggkAoMuuXBDOE4owDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEAE+U6EJqNIZ3ek/Vk6kVN1nW2uo0MCgHWZZ2Q1iNfgdm7ncuWz9WOHdAn0+tKNHlDK9Nc9v7wmcZiroOajUvNDMrPtQmfcBDftisi3Viz/vv6ATxWlnHW2qJfPxbiZR0fDyh1T6g4RjSDPBthWnE3yLZXBG3PHW3yvf6SPGv0UV60hCP9Zzode+0AHOtNpqqnFYALQcdh9/CdwgnttftZbp66aAOOxY0LinEnppHdxMf5hZTAZHbCGLyQT/C2oKK8QNbVSE/WGQq0Hx/PHeqGc0EPIq1OfNjMkFm+eJT+HvVCUi9+mjX/XVEBmD1TgyvTr7GaDhxRzYjuNJIgaDddIA==';
const uatCertStr = 'MIIEcTCCA1mgAwIBAgIJAPaCVWFICoVxMA0GCSqGSIb3DQEBBQUAMIGBMQswCQYDVQQGEwJVUzELMAkGA1UECBMCR0ExEDAOBgNVBAcTB0F0bGFudGExDzANBgNVBAoTBkluQ29tbTEQMA4GA1UECxMHSW5mb1NlYzENMAsGA1UEAxMESU1TUzEhMB8GCSqGSIb3DQEJARYSbm9jbWFpbEBpbmNvbW0uY29tMB4XDTE0MDExNTE2MDUzOVoXDTI0MDExMzE2MDUzOVowgYExCzAJBgNVBAYTAlVTMQswCQYDVQQIEwJHQTEQMA4GA1UEBxMHQXRsYW50YTEPMA0GA1UEChMGSW5Db21tMRAwDgYDVQQLEwdJbmZvU2VjMQ0wCwYDVQQDEwRJTVNTMSEwHwYJKoZIhvcNAQkBFhJub2NtYWlsQGluY29tbS5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC9/+tfRTK+6pEOnCdphjMXDZ0DKwhbmGDYECEiLgtjaOL+rDI2omQGpH3ENxe/up/PHqdk4VlH6z43x67U3fNrxGPsGoCQyfU6lb3kql8vB0B7SiUpnuYDScCq+f1puVwYmMJ1V4sc/r5m72m60oFbfQAgQ0BTmLu/FmHss3z8b6H0uPEUY6LDDkDMp4zte73V9xVMSNGs8TjREdq3BVcWJuAL0UvbOr1PNdEFtRg0GB0Yg0ga4FJsKvEhiIb6LH0ruLWiJrBSmjrK1YDokiuHH+guyg8bgrXgSJjJtW/2ZU1LFx8uJt6Zg3JLhYsWr+hk3EPxlDKIAPhUt3bMltW7AgMBAAGjgekwgeYwHQYDVR0OBBYEFK0mYHgXQM4RcyHFrCBdqQqm7VfsMIG2BgNVHSMEga4wgauAFK0mYHgXQM4RcyHFrCBdqQqm7VfsoYGHpIGEMIGBMQswCQYDVQQGEwJVUzELMAkGA1UECBMCR0ExEDAOBgNVBAcTB0F0bGFudGExDzANBgNVBAoTBkluQ29tbTEQMA4GA1UECxMHSW5mb1NlYzENMAsGA1UEAxMESU1TUzEhMB8GCSqGSIb3DQEJARYSbm9jbWFpbEBpbmNvbW0uY29tggkA9oJVYUgKhXEwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQUFAAOCAQEAqJvWdtqxETDzt7cvEO/xmZ4TkMkPlb++18JkktS3G/gs749JMV4rjBheu9wFEKN93w4rxnILoY7SQLo2Y8iD3YxWFB0UbblPhneCcHTBCX3nXJOtcAT3hoB1oUSw9CeypxVoPSPlChTqVjZGW9v3qDCiXE4MRxjXvJ+DeGItxs51QXCeZ9PpmxpunWVMngPCVGdfoJHWoQOo28lfyZRHhkC7h23jMyNICMswoI0l248b5hWjhH1TX/bbsz6Si4o5xLT4ad6Lrnqo1aqI+zrpXauLaYf7Xrs6LXkIpuNraA+kwjUQZSCXktF26fON0Jxumrq8uSklzTfpHvpdFX+iCw==';

module.exports = (req, res) => {
    var body = req.body;
    var db = admin.firestore();
    var ref = db.collection('applications');

    let titleWithNoSpaces = body.name.replace(/\s/g, "");
    let prodAsset = {
        title: `${titleWithNoSpaces}_prod`,
        type: 1,
        name: "ProdAES",
        data: prodCertStr
    };

    let uatAsset = {
        title: `${titleWithNoSpaces}_uat`,
        type: 1,
        name: "UatAES",
        data: uatCertStr
    };
    var app = {
        author: body.author,
        comments: body.comments,
        name: body.name,
        appEnviroment: body.mobileAppEnvironment,
        uatAnalyticsId: body.uatAnalyticsId,
        prodAnalyticsId: body.prodAnalyticsId,
        mobileAppUat: body.mobileAppUat,
        mobileAppProd: body.mobileAppProd,
        mobileAppCmsId: body.mobileAppCmsId,
        assets: [prodAsset, uatAsset],
        androidBundleId: body.androidBundleId,
        iosBundleId: body.iosBundleId
    };
    // get doc 
    ref.doc(body.name).get().then(doc => {
        if (doc.exists) {
            res.status(409).send({
                'error': 'app nmame duplicated'
            });
        } else {
            var appRef = ref.doc(body.name);
            var setDoc = appRef.set(app).then((ap) => res.send(app)).catch(error => res.status(500).send(error));
        }
    }).catch(error => res.status(500).send(error));
};