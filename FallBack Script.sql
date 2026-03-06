USE [ThirdParties]
GO

-- fallback.Requests
INSERT INTO [fallback].[Requests]
    ([ParentID], [CorrellationId], [SourceChannel], [ProductCode], [PolicyId], [ProducerId], [ExpirationDate], [Status], [Payload], [CreatedAt], [UpdatedAt])
VALUES
    (NULL, '78b46688-a8fc-40ae-a557-4e3215826d6b', 'InterestForm', '', '0000009724-001', '123321', '2026-12-12 00:00:00.000', 'Failed', N'{"policyId":"0000009724-001","producerId":"123321","expirationDate":"2026-12-12T00:00:00","insuredPersons":[{"firstName":"??????????","lastName":"??????????","fatherName":"??????????","dateOfBirth":"1977-11-05T00:00:00","gender":"M","socialSecurityId":"","isMainInsured":true,"gdprConsent":true,"marketingConsent":false,"taxNumber":"999999999","taxNumberType":"??????????","mobilePhone":"","email":""},{"firstName":"??????","lastName":"???????","fatherName":"???????","dateOfBirth":"1999-01-01T00:00:00.000","gender":"F","socialSecurityId":"","isMainInsured":false,"gdprConsent":false,"marketingConsent":false}]}', '2026-03-05 15:31:25.170', '2026-03-05 15:32:01.820')
GO

DECLARE @ParentRequestId INT = SCOPE_IDENTITY()

INSERT INTO [fallback].[Requests]
    ([ParentID], [CorrellationId], [SourceChannel], [ProductCode], [PolicyId], [ProducerId], [ExpirationDate], [Status], [Payload], [CreatedAt], [UpdatedAt])
VALUES
    (@ParentRequestId, '232cafeb-ff59-4279-9a28-584bd9d6378b', 'Fallback', '', '0000009724-001', '123321', '2026-12-12 00:00:00.000', 'Completed', N'{"policyId":"0000009724-001","producerId":"123321","expirationDate":"2026-12-12T00:00:00","insuredPersons":[{"firstName":"??????????","lastName":"??????????","fatherName":"??????????","dateOfBirth":"1977-11-05T00:00:00","gender":"M","socialSecurityId":"","isMainInsured":true,"gdprConsent":true,"marketingConsent":false,"taxNumber":"999999999","taxNumberType":"??????????","mobilePhone":"","email":""},{"firstName":"???????","lastName":"???????","fatherName":"???????","dateOfBirth":"1999-01-01T00:00:00.000","gender":"F","socialSecurityId":"","isMainInsured":false,"gdprConsent":false,"marketingConsent":false,"status":"ReadyToResubmit"}]}', '2026-03-05 15:39:27.157', '2026-03-05 15:39:49.597')
GO

-- fallback.RequestMembers for first Request (ParentRequestId)
DECLARE @ParentRequestId INT = (SELECT [Id] FROM [fallback].[Requests] WHERE [CorrellationId] = '78b46688-a8fc-40ae-a557-4e3215826d6b')
DECLARE @ChildRequestId  INT = (SELECT [Id] FROM [fallback].[Requests] WHERE [CorrellationId] = '232cafeb-ff59-4279-9a28-584bd9d6378b')

INSERT INTO [fallback].[RequestMembers]
    ([RequestId], [IsMainInsured], [FirstName], [LastName], [MiddleName], [Gender], [BirthDate], [AmkaNum], [MarketingConsent], [GdprConsent], [HomePhoneNum], [CellularPhoneNum], [EmailAddress], [TaxNumType], [TaxNum], [IdNum], [Status], [CreatedAt], [UpdatedAt], [CrmId], [NelisId], [ProspectId], [PersonalizedLink], [ErrorCode], [ErrorDescription])
VALUES
    (@ParentRequestId, 1, N'??????????', N'??????????', N'??????????', 'M', '1977-11-05', NULL, 0, 1, NULL, NULL, NULL, N'??????????', '999999999', NULL, 'Valid',   '2026-03-05 15:31:28.923', '2026-03-05 15:31:50.487', '1-EZ3XK', '01166083', NULL, 'https://dsp.example.com/product?data=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiV1NNLVVSTFFTLTIwMjYwMS1ERVZLRVkifQ..VtbbR4wCOXwwHXwN.WZ1GwpwWe8d5pCR1vFEk-OzSMIYbksxConsPRfBkZsnnsoZh8Rz8Ri4j3MtrB_vi_ghWzQdrI8sIjXb41FP6EyesdwoFyYpC6F-7sSQkaTnSYCieaEfa4bfzE8d30FuRmVJoLryZK1XQP8Up8WDGRJkoxeAP59XbfPDMwte7Z0tu7Dm6IAKq7C-EuJq_Qc3pW3y9GRABBj0jkjOV6XFmIK9WpXNVH5MyMAB_2p80RPhC9g.ouv7Xd93tEPAxZjKzo53OQ', NULL, NULL),
    (@ParentRequestId, 0, N'??????',    N'???????',    N'???????',    'F', '1999-01-01', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'Invalid', '2026-03-05 15:31:28.920', '2026-03-05 15:31:59.540', NULL, NULL, NULL, NULL, '007', 'Insured person not included in policy'),
    (@ChildRequestId,  1, N'??????????', N'??????????', N'??????????', 'M', '1977-11-05', NULL, 0, 1, NULL, NULL, NULL, N'??????????', '999999999', NULL, 'Valid',   '2026-03-05 15:39:33.397', '2026-03-05 15:39:57.823', '1-EZ3XK', '01166083', NULL, 'https://dsp.example.com/product?data=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiV1NNLVVSTFFTLTIwMjYwMS1ERVZLRVkifQ..lyC6FYjcZ-4ZUQtd.YkEe0mcgF0jskChzni0gkHISyatRL0FJdZDnAoy218G_X9wHMtxmva48aih0bdGDF6vFprPt2kK18J1uwNGMzS7lL8Wv_-LUP71P_boB877mRivlV3Txx2gkB4kiAPjr6SfXwGI7i8hf0V3zYkM7dgd80mfNg0SmIWf66kOFx2kvHTsTUb3MI8jvEIkl_ZNJnuAtSBk5xuFPUVsBBj6c4nIZQv30-c5wbUqGxi8lSXuJlg.kYqfHjJC4l0UAwieIBd_Jw', NULL, NULL),
    (@ChildRequestId,  0, N'???????',   N'???????',    N'???????',    'F', '1999-01-01', NULL, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, 'Valid',   '2026-03-05 15:39:33.380', '2026-03-05 15:40:19.017', NULL, NULL, NULL, 'https://dsp.example.com/product?data=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIiwia2lkIjoiV1NNLVVSTFFTLTIwMjYwMS1ERVZLRVkifQ..9f5lUJSk8ddWzMSu.ntz_nD8cTKqy0n2gy7849NCFdSyQ2565XXnl7fEIheM01Tpj5eOqiNsoqXkVR9RlyKoFfR9Vjk0azSdvjiHJ9oDnk7cCdUDI13s8cYZtRF0CHPp0A7Gl2VGd3ogJPgCljNt2w9umadA0-MP9-sNoIHwiVUdIvqaeFHw-LHeftAZO_yUbQDqCOm2RbO9pxH4ymT7kCdCKNgU4wHXvIfNMM1GlzjQDyaWTc63fC2CmDqlz.uYdrIIySiuTDPWjrSP7CXQ', NULL, NULL)
GO